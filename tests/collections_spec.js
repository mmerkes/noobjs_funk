'use strict';

var funk = require('../noobjs_funk.js'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

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
});
