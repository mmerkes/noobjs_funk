'use strict';

var funk = require('../noobjs_funk.js'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

// NOOBjs Funk should be able to get funky
describe('Getting funky', function() {
  it('should be able to take you to Funky Town', function() {
    expect(funk.getFunky()).to.be.ok;
  });
});

// Test methods that can be used with Collections - Objects and Arrays
describe('Collection method tests', function() {
  // Test each/forEach
  describe('each should iterate through the collection and perform the callback', function() {
    it('should iterate through an array and return the object', function() {
      var arr = [1, 2, 2],
          num = 0;
      expect(funk.each( arr, function( value ) {
        num += value;
      })).to.equal(arr);
      num.should.equal(5);
    });

    it('should iterate through an Object and return the object', function() {
      var obj = { a: 1, b: 2, c: 3 },
          num = 0;
      expect(funk.each( obj, function( value ) {
        num += value;
      })).to.equal(obj);
      num.should.equal(6);
    });

    it('should iterate through a String and return it', function() {
      var checkString = false;
      expect(funk.each( 'abc', function( value ) {
        checkString = true;
      })).to.equal('abc');
      checkString.should.equal(true)
    });

    it('should return the value if it is not a collection', function() {
      var checkNull = false;
      expect(funk.each( null, function( value ) {
        checkNull = true;
      })).to.equal(null);
      checkNull.should.equal(false);

      var checkNumber = false;
      expect(funk.each( 10, function( value ) {
        checkNumber = true;
      })).to.equal(10);
      checkNull.should.equal(false);

      var checkUndefined = false;
      expect(funk.each( undefined, function( value ) {
        checkUndefined = true;
      })).to.equal(undefined);
      checkUndefined.should.equal(false);
    });
  });

  // Test map
  describe('map should iterate through a collection, perform the ' +
    'callback, and return the result as an array', function() {
    it('should iterate through a collection, perform a callback, and return an array', function() {
      var arr = [ 1, 2, 3 ],
          result = '149';
      expect( funk.map( arr, function( value ) {
        return value * value;
      }).join('')).to.equal( result );

      var obj = { a: 2, b: 3, c: 4};
      result = '4916';
      expect( funk.map( obj, function( value ) {
        return value * value;
      }).join('')).equal( result );
    });

    it('should return an empty array it not a collection', function() {
      expect( funk.map( null, function( value ) {
        return true;
      }).length ).to.equal( 0 );

      expect( funk.map( 24, function( value ) {
        return true;
      }).length ).to.equal( 0 );
    })
  });

  // Test reduce
  describe('reduce should iterate through a collection, perform the ' +
    'callback, and return one result.', function() {
    it('should iterate through a collection, perform a callback, and return one value', function() {
      var arr = [ 1, 2, 3 ],
          result = 6;
      expect( funk.reduce( arr, function( memory, value ) {
        return memory += value;
      }, 0 )).to.equal( result );

      var obj = { a: 2, b: 3, c: 4 };
      result = 9;
      expect( funk.reduce( obj, function( memory, value, index, list ) {
        return memory += list[index];
      }, 0 )).to.equal( result );
    });

    it('should return the initial value if it was not actually passed a collection', function() {
      expect(funk.reduce( null, function( value ) {
        return true;
      }, false )).to.equal(false);

      expect(funk.reduce( 48, function( value ) {
        return true;
      }, false )).to.equal(false);
    });
  });

  // Test pluck
  describe('pluck should iterate through an array of object and pluck ' +
    'the values matching the property name passed', function() {
    it('should pluck the values for the matching property', function() {
      expect( funk.pluck( [ {a: 1, b:2, c: 3}, {a: 1, c: 3, d: 4 }], 'a')
        .join('')).to.equal('11');
      var test = funk.pluck( [ {a: 1, b: 2}, {b: 2} ], 'a' );
      expect( test[1] ).to.equal(undefined);
      expect( test.length ).to.equal(2);
    });

    it('should return an empty array if not passed an array of properties', function() {
      expect( funk.pluck( null, 'a').length ).to.equal(0);
      expect( funk.isArray( funk.pluck( 5, 'a')) ).to.be.ok;
    });

    it('should return an array of undefined if not passed a key to match', function() {
      var test = funk.pluck([ {a: 1, b: 2}, {b: 2} ]);
      expect( test.length ).to.equal(2);
      // When joined, undefined is just an empty string
      expect( test.join() ).to.equal(',');
    });
  });

  // Test extend
  describe('extend should copy the contents of source objects into a ' +
    'destination object and return that object', function() {
    it('should copy the contents of sources into the destination', function() {
      var test = funk.extend( {a: 1}, {b: 2, c: 3}, { d: 4 } );
      expect( funk.keys( test ).join('') ).to.equal('abcd');
      expect( funk.values( test ).join('') ).to.equal('1234');
    });

    it('should overwrite earlier values if a later source object ' +
      'has the same property name', function() {
      expect( funk.extend( {a: 1}, {b: 2}, {b: 3} )['b'] ).to.equal(3);
    });

    it('should ignore sources that are not objects or arrays', function() {
      expect( funk.keys( funk.extend( {a: 1}, 2, 3 )).length )
        .to.equal(1);
    });
  });

  // Test find
  describe('find should look through each value in a collection and ' +
    'return the first one that the callback return true, or undefined if ' +
    'no value satisfies the callback', function() {
    it('should return the first matching value in a collection', function() {
      expect( funk.find( [ 1,2,3,4 ], function( value ) {
        return value > 2;
      } )).to.equal(3);

      expect( funk.find( { a: 1, b: 2, c: 3, d: 4 }, function( value ) {
        return value > 1 && value % 2;
      })).to.equal( 3 );
    });

    it('should return undefined if a match is not found', function() {
      expect( funk.find( [ 1, 2, 3 ], function( value ) {
        return value > 4;
      })).to.equal( undefined );

      expect( funk.find( 5, function( value ) {
        return value > 3;
      })).to.equal( undefined );
    });
  });

  // Test filter
  describe('filter should look through each value in a collection and return an array ' +
    'of all the items that passed the truthy test', function() {
    it('should return an array of all values that pass the truthy test', function() {
      expect( funk.filter( [ 1, 2, 3, 4, 5 ], function( num ) {
        return num > 2;
      }).join('') ).to.equal( '345' );
      expect( funk.filter( { a: 1, b: 2, c: 3, d: 4, e: 5 }, function( num ) {
        return num < 3;
      }).join('') ).to.equal( '12' );
      expect( funk.filter( [ 1, 2, 3 ], function( num ) {
        return num > 3;
      }).length ).to.equal(0);
    });

    it('should return an empty array if not passed a collection', function() {
      expect( funk.isArray( funk.filter( 5, function(num) { 
        return num > 2; 
      }))).to.be.ok;
      expect( funk.filter( null, function( num ) {
        return num === null;
      }).length ).to.equal(0);
    });
  });

  // Test where
  describe('where should look through each value in a collection and return ' +
    'an array of all key-value pairs that matches the list of properties', function() {
    it('should return all of the matches key-value pairs in an array', function() {
      var arrayList = [[1,2,3],[1,2,3],[1,5,3]];
      expect( funk.where( arrayList, { '1': 2 }).join('') )
        .to.equal("1,2,31,2,3");

      var objList = [ { team: 'Packers', year: 1967, name: 'Bart Starr' },
                      { team: 'Packers', year: 1967, name: 'Willie Davis'},
                      { team: 'Chiefs', year: 1967, name: 'Buck Buchanan'},
                      { team: 'Chiefs', year: 1967, name: 'Jerry Mays'}];
      var results = funk.where( objList, { team: 'Packers', year: 1967 } );
      expect( results.length ).to.equal( 2 );
      expect( funk.filter( results, function( value ) {
        return value.team === 'Packers';
      }).length ).to.equal( 2 );
    });

    it('should return an empty array if there are not matches', function() {
      var objList = [ { team: 'Packers', year: 1967, name: 'Bart Starr' },
                      { team: 'Packers', year: 1967, name: 'Willie Davis'},
                      { team: 'Chiefs', year: 1967, name: 'Buck Buchanan'},
                      { team: 'Chiefs', year: 1967, name: 'Jerry Mays'}];
      var results = funk.where( objList, { team: 'Cowboys', year: 1967 } );
      expect( results.length ).to.equal( 0 );

      expect( funk.where( 5, 5 ).length ).to.equal( 0 );
    });
  });
});








