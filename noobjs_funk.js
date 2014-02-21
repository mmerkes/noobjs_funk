module.exports = (function() {
  var funk = {};

  funk.VERSION = '0.0.1';

  // Iterate through a collection and invoke the callback on each
  // element if it's an array or value if it's an object.
  // The callback is called with (element, index, list) if it's
  // an array or string, and (value, key, list) if it's an object
  var each = funk.each = funk.forEach = function( collection, callback ) {
    var length, i, key;

    // Check for null and undefined, and false and 0
    if( collection == null || collection == false ) {
      return collection;
    } 
    // Check to see if collection is an array or string
    // and perform the callback. If it has the length, it will
    // return a number and this will fire. Otherwise, it will return
    // 0, which would return the collection, or undefined, which when
    // converted to a number would be NaN
    length = collection.length;
    if( length === +length) {
      for( i = 0; i < length; i++ ) {
        // callback( element, index, list )
        callback( collection[i], i, collection );
      }
    } else {
      // Otherwise, iterate through the collection as if it's an 
      // object and call the callback on each value.
      for( key in collection ) {
        // callback( value, key, list )
        callback( collection[key], key, collection );
      }
    }
    // Return the collection for chaining methods
    return collection;
  };

  // Iterate through a collection and invoke the callback on each
  // element if it's an array or value if it's an object.
  // The callback is called with (element, index, list) if it's
  // an array or string, and (value, key, list) if it's an object
  funk.map = function( collection, callback ) {
    // Save the results that the callback returns
    var results = [];

    // Iterate through the collection and pass the element, index,
    // and list into the callback, and push the returned values
    // to the results array.
    each( collection, function( element, index, list ) {
      results.push( callback( element, index, list ));
    });

    // If the collection was not actually a collection, the 
    // each method should have return it as is, which would
    // be the first element in the array Otherwise, return
    // the results array.
    if( results[0] === collection ) {
      return [];
    } else {
      return results;
    }
  };


/*
-------------Object Methods---------------
*/

  // NaN is the only value in JavaScript that doesn't equal itself.
  // As little sense as that makes, it means that it's really easy to test
  funk.isNaN = function( value ) {
    return value !== value;
  };

  // Checks to see if value is an instance of array
  funk.isArray = function( value ) {
    return value instanceof Array;
  };

  // Checks to see if value is an object
  funk.isObject = function( value ) {
    // See if value still equals itself if you turn it into an object
    return value === Object(value);
  };
  /*
    Another method to see if a value is an object would be the 
    typeof operator. However, the typeof operator will return
    'function' for Object and Function, which are actually objects.
  */
/*
---------------Other Methods---------------
*/
  funk.getFunky = function() {
    funk.each( funkyTown, function( value ) {
      console.log(value);
    });
    return true;
  };

var funkyTown = [
  '',
  'FFFFFFFFFFFFFFFFFFF                                      FFFF',
  'FFFFFFFFFFFFFFFFFFF                                      FFFF',
  'FFFF                                                     FFFF',
  'FFFF                                                     FFFF    FFFF',
  'FFFFFFFFFFFFFF     FFFF           FFFF  FFFF FFFFFFFF    FFFF   FFFF  FFFF          FFFF',
  'FFFFFFFFFFFFFF     FFFF           FFFF  FFFFFFFFFFFFFF   FFFF  FFFF    FFFF        FFFF',
  'FFFF               FFFF           FFFF  FFFFFF     FFFF  FFFF FFFF      FFFF      FFFF',
  'FFFF               FFFF           FFFF  FFFF       FFFF  FFFFFFFFFF      FFFF    FFFF',
  'FFFF               FFFF           FFFF  FFFF       FFFF  FFFFFF FFFF      FFFF  FFFF',
  'FFFF                FFFF         FFFF   FFFF       FFFF  FFFF    FFFF      FFFFFFFF ',
  'FFFF                  FFFF     FFFF     FFFF       FFFF  FFFF     FFFF      FFFFFF',
  'FFFF                    FFFFFFFFFF      FFFF       FFFF  FFFF      FFFF      FFFF  ',
  '                                                                            FFFF',
  '                                                                           FFFF',
  'FFFFFFFFFFFFFFFFFFFF                                                      FFFF',
  'FFFFFFFFFFFFFFFFFFFF                                                     FFFF',
  '        FFFF                                             ',
  '        FFFF            FFFFFFF                            ',
  '        FFFF          FFFFFFFFFFF   FFFF                        FFFF      ',
  '        FFFF         FFFF     FFFF   FFFF                      FFFF   FFFF FFFFFFFF',
  '        FFFF        FFFF       FFFF   FFFF        FFFF        FFFF    FFFFFFFFFFFFFF',
  '        FFFF       FFFF         FFFF   FFFF      FFFFFF      FFFF     FFFFFF     FFFF',
  '        FFFF       FFFF         FFFF    FFFF    FFFFFFFF    FFFF      FFFF       FFFF',
  '        FFFF        FFFF       FFFF      FFFF  FFFF  FFFF  FFFF       FFFF       FFFF',
  '        FFFF         FFFF     FFFF        FFFFFFFF    FFFFFFFF        FFFF       FFFF',
  '        FFFF          FFFFFFFFFFF          FFFFFF      FFFFFF         FFFF       FFFF',
  '        FFFF            FFFFFFF             FFFF        FFFF          FFFF       FFFF'
  ];

  return funk;
})();





