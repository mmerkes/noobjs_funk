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
});








