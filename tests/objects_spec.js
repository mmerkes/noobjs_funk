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
});
