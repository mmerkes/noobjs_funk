'use strict';

var funk = require('../noobjs_funk.js'),
    expect = require('chai').expect;

// NOOBjs Funk should be able to get funky
describe('Getting funky', function() {
  it('should be able to take you to Funky Town', function() {
    expect(funk.getFunky()).to.be.ok;
  });
});

describe('Object method tests', function() {
  // Test for NaN
  describe('isNaN should identify NaN and return false otherwise', function() {
    it('should return true if it was passed NaN', function() {
      expect(funk.isNaN(NaN)).to.be.ok;
    });
    it('should return false if it was passed something other than NaN', function() {
      expect(funk.isNaN(false)).to.not.be.ok;
      expect(funk.isNaN(true)).to.not.be.ok;
      expect(funk.isNaN({})).to.not.be.ok;
      expect(funk.isNaN('')).to.not.be.ok;
      expect(funk.isNaN(undefined)).to.not.be.ok;
    });
  });

  // Test for an Array
  describe('isArray should identify an Array and return false otherwise', function() {
    it('should return true if it was passed an array', function() {
      expect(funk.isArray([1, 2, 3])).to.be.ok;
      expect(funk.isArray([])).to.be.ok;
    });

    it('should return false if it was passed anything other than an array', function() {
      expect(funk.isArray(true)).to.not.be.ok;
      expect(funk.isArray(false)).to.not.be.ok;
      expect(funk.isArray({})).to.not.be.ok;
      expect(funk.isArray(54)).to.not.be.ok;
      expect(funk.isArray('not an array')).to.not.be.ok;
      expect(funk.isArray(null)).to.not.be.ok;
      expect(funk.isArray(funk.isNaN())).to.not.be.ok;
    });
  });

  // Test for object
  describe('isObject should identify an object and return false otherwise', function() {
    it('should return true if it was passed an object', function() {
      expect(funk.isObject({})).to.be.ok;
      expect(funk.isObject({ a: 1, b: 2})).to.be.ok;
      expect(funk.isObject(Object)).to.be.ok;
      expect(funk.isObject(Function)).to.be.ok;
    });

    it('should return false it was passed anything else', function() {
      expect(funk.isArray(true)).to.not.be.ok;
      expect(funk.isArray(false)).to.not.be.ok;
      expect(funk.isArray(0)).to.not.be.ok;
      expect(funk.isArray(54)).to.not.be.ok;
      expect(funk.isArray('not an object')).to.not.be.ok;
      expect(funk.isArray(funk.isNaN)).to.not.be.ok;
    });
  });

  // Test values
  describe('values should return all of the values in an object as an array', function() {
    it('should return the values in an object', function() {
      expect( funk.values( { a: 1, b: 2, c: 3 } ).join('') ).to.equal('123');
      expect( funk.values( [ 1, 2, 3 ] ).join('') ).to.equal('123');
    });

    it('should return an empty array if not passed an object or array', function() {
      expect( funk.values( 5 ).length ).to.equal(0);
      expect( funk.isArray( funk.values( null ))).to.be.ok;
    });
  });

  // Test keys
  describe('keys should return all of the keys in an object as an array', function() {
    it('should return the keys in an array', function() {
      expect( funk.keys( { a: 1, b: 2, c: 3 } ).join('')).to.equal('abc');
      expect( funk.keys( [ 4, 5, 6 ] ).join('')).to.equal('012');
    });

    it('should return an empty array if not passed an object or array', function() {
      expect( funk.keys( 5 ).length ).to.equal(0);
      expect( funk.isArray( funk.keys( null ))).to.be.ok;
    });
  });

  // Test invert
  describe('invert should switch the keys and values in an object', function() {
    it('should invert an object', function() {
      var test = funk.invert( { a: 1, b: 2, c: 3 } );
      expect( funk.values( test ).join('') ).to.equal('abc');
      expect( funk.keys( test ).join('') ).to.equal('123');

      test = funk.invert([ 1, 2, 3 ]);
      expect( funk.values( test ).join('') ).to.equal('012');
      expect( funk.keys( test ).join('') ).to.equal('123');
    });

    it('should return an empty object if not passed an array or object', function() {
      expect( funk.isObject( funk.invert(5) ) ).to.be.ok;
      expect( funk.keys( funk.invert( null ) ).length ).to.equal(0);
    });
  });
});







