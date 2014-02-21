module.exports = (function() {
  var funk = {};


  // NaN is the only value in JavaScript that doesn't equal itself.
  // As little sense as that makes, it means that it's really easy to test
  funk.isNaN = function( value ) {
    return value !== value;
  };

  // Checks to see if value is an instance of array
  funk.isArray = function( value ) {
    return value instanceof Array;
  };

  return funk;
})();
