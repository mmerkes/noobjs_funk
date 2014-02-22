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

// Test methods that can be used with Arrays
describe('Array method tests', function() {
  // Test indexOf
  describe('should return the index of the first unique instance in an array or string', function() {
    it('should be able to find the index of an element in an array', function() {
      expect( funk.indexOf( [ 1, 2, 3, 4 ], 3 ) ).to.equal(2);
      expect( funk.indexOf('string', 'i') ).to.equal(3);
    });

    it('should return -1 if an array is not passed into the method', function() {
      expect( funk.indexOf(null)).to.equal(-1);
      expect( funk.indexOf(24)).to.equal(-1);
      expect( funk.indexOf({ a: 1, b: 2 })).to.equal(-1);
    })
  });

  // Test union
  describe('union should compute the union of passed in array, which ' +
    'will be a list of unique items in order of one or more passed arrays', function() {
    it('should be able to take an array and return only unique values in order', function() {
      var arr = [ 1, 2, 3, 3, 2, 1];
      expect( funk.union( arr ).join('') ).to.equal('123');
    });

    it('should be able to take multiple values, and compute ' +
      'the union of all the values, arrays or not', function() {
      var arr1 = [ 1, 2, 3, 4 ],
          arr2 = [[ 2, 4, 6, 8 ], [ 3, 5, 7, 9 ]],
          val1 = 'string',
          val2 = 27,
          val3 = undefined;
      expect( funk.union( arr1, arr2, val1, val2, val3 ).join('')
        ).to.equal('12342,4,6,83,5,7,9string27');
      //expect( funk.union( null ).join('')).to.equal(null);
    });

    it('should know the difference between "1,2,3" and [ 1, 2, 3 ]', function() {
      expect( funk.union( '1,2,3', [[1,2,3]] ).join('')).to.not.equal('1,2,3');
    });
  });
});












