module.exports = (function() {
  var funk = {};

  funk.VERSION = '0.0.1';

/*
---------------Collection Methods-------------------------
*/

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
    each( collection, function( value, index, list ) {
      results.push( callback( value, index, list ));
    });

    // If the collection was not actually a collection, the 
    // each method should have return it as is, which would
    // be the first element in the array Otherwise, return
    // the results array.
    if( results[0] === collection ) {
      return [];
    }
    return results;
  };

  // Iterate through a collection and invoke the callback on each
  // element if it's an array or value if it's an object, and
  // it turns a list of values into one value, returning it.
  // The callback is called with ( memory, value, index, list )
  funk.reduce = function( collection, callback, initial ) {
    var memory = initial;

    funk.each( collection, function( value, index, list ) {
      memory = callback( memory, value, index, list );
    });

    // If collection wasn't really a collection, return the
    // initial value. Otherwise, return the memory.
    if( memory === collection ) {
      return initial;
    }
    return memory;
  };

  // pluck takes an array of objects as it's first argument,
  // and a property name as it's second argument, and goes through
  // the objects and returns an array of the values for the property name.
  funk.pluck = function( list, property ) {
    var results = [],
        i;

    // Iterate through the list of objects passed into pluck
    each( list, function( object ) {
      // push the value of the matching property in the object
      results.push( object[property] );
    });

    return results;
  };

  // find takes a collection and a callback. It goes through each
  // value until if finds a value that causes the callback to return
  // true. If no match is found, it returns undefined.
  funk.find = function( collection, callback ) {
    // Iterate through the collection to look for a match
    for( var key in collection ) {
      // If the callback returns true, return the value and call it a day!
      if( callback( collection[key] )) {
        return collection[key];
      }
    }
    // If no match was found, return undefined
    return undefined;
  };

  // filter takes a collection and a truthy test (predicate), and returns
  // all values into an array that pass the test. It should return an empty
  // array if no values match
  funk.filter = function( collection, truther ) {
    // store the matches
    var results = [];

    // Iterate through the collection
    each( collection, function( value ) {
      // If the value passes the truther test
      if( truther( value ) ) {
        // push the value into the results array
        results.push( value );
      }
      // Otherwise, do nothing
    });

    // return the results
    return results;
  };

  // where looks through each value in a collection, and returns
  // an array of each key-value pair that matches the list properties.
  // i.e. funk.where( listOfPlayers, { team: 'Packers', year: 1967 });
  // -> [ { team: 'Packers', year: 1967, name: 'Bart Starr' },
  //      { team: 'Packers', year: 1967, name: 'Willie Davis'}, ...]
  funk.where = function( collection, properties ) {
    // Save the matches in an array
    var results = [];
    
    // Iterate through each item in the collection and test them
    each( collection, function( object ) {
      // Innocent until proven guilty
      // Iterate through the properites and see if we have
      // pairs that don't match
      for( var key in properties ) {
        // If we find one that doesn't match, return undefined
        if( object[key] !== properties[key] ) {
          return;
        }
      }

      // If all properties were found in the object and 
      // we didn't return undefined, we have a match
      return results.push( object );
    });

    return results;
  };

  // findWhere looks through a list and finds the first value
  // that matches keys and values passed in, and returns it.
  // funk.findWhere( myList, { color: 'green', size: 'S' });
  // -> { color: 'green', size: 'S', name: 'My t-shirt' }
  funk.findWhere = function( collection, properties ) {
    var i, key, object, match;

    // Iterate through each item until you find a match
    for( i = 0; i < collection.length; i++ ) {
      // Save a shortcut to the current object
      object = collection[i];
      // Set match to true
      match = true;
      // Check each key/value pair in the properties
      for( key in properties ) {
        // If we find one that doesn't match, set match to false
        // and break the for in loop
        if( object[key] !== properties[key] ) {
          match = false;
          break;
        }
      }
      // If all properties matched an object, return it.
      if( match ) {
        return object;
      }
    }
    // No matches were found. Return undefined.
    return undefined;
  };

  // reject returns a list without the elements that
  // passed the truth test (predicate). The opposite of filter.
  funk.reject = function( collection, truther ) {
    // store the rejects
    var results = [];

    // Iterate through the collection
    each( collection, function( value ) {
      // If the value fails the truther test
      if( !truther( value ) ) {
        // push the value into the results array
        results.push( value );
      }
      // Otherwise, do nothing
    });

    // return the results
    return results;
  };

  // every returns true if all items in a list pass the 
  // truthy test, and false if any items fail. However,
  // it returns true if not pass a list.
  funk.every = function( collection, truther ) {
    // Because result is set to true, if collection is
    // never iterated through because it's not a collection,
    // every will return true. This seems usual behavior,
    // but we're keeping it to match Underscore.
    var result = true;

    // Check that collection is not null or undefined
    if( collection == null ) {
      return result;
    }

    /******************************
    Write this into a function as it's in many methods
    *******************************/
    // Iterate through the collection
    each( collection, function( value ) {
      // If the value fails the truther test
      if( !truther( value ) ) {
        // Set result to false
        return result = false;
      }
    });

    // Return result, which would still be true if
    // no items failed the truther test
    return result;
  };

  // Returns true if any of the values in a collection 
  // pass the predicate truth test. If no predicate is
  // provided it will just check if any of the values are truthy.
  funk.some = function( collection, predicate ) {
    if( !collection ) {
      return false;
    }

    if( !predicate ) {
      predicate = function( value ) {
        return value;
      }
    }

    for( var key in collection ) {
      if( predicate( collection[key] ) ) {
        return true;
      }
    }

    return false;
  };

/*
-------------------Array Methods------------------
*/

  // indexOf finds the index of the first instance a value
  // appears in an array, or -1 if it is not present. 
  // This is tests with ===, so it returns exact matches only.
  // Returns -1 if an array isn't passed in
  var indexOf = funk.indexOf = function( list, value ) {
    // Make sure that list is an array or string, otherwise return -1
    if( list == null || list.length !== +list.length ) {
      return -1;
    }
    // Iterate through the array to find the first instance of the value
    var length = list.length;
    for( var i = 0; i < length; i++ ) {
      if( list[i] === value ) {
        // Return the index if the value is found
        return i;
      }
    }
    // Return -1 if the value isn't found.
    return -1;
  };

  // union computes the union of passed in array or values, which is the
  // unique set of values from one or more arrays, in order.
  // i.e. funk.union( [ 1, 2, 4 ], [ 0, 1, 2, 3, 6 ], -1 ); 
  // -> returns [ 1, 2, 4, 0, 3, 6, -1 ]
  funk.union = function( ) {
    // Access the arguments passed into the function
    var args = arguments, 
        length = args.length,
        // Using an object to store element as keys to find uniques
        unique = {},
        // store unique arrays to differentiate from string
        uniqueArrays = {},
        // If a value is unique, push it to the results array
        results = [],
        // store hold the value to save typing
        temp,
        i, j;

    // Iterate through the arguments to find all of the unique values
    for( i = 0; i < length; i++ ) {
      temp = args[i];
      if( !funk.isArray(temp) ) {
        if( !unique[temp] ) {
          unique[temp] = true;
          results.push( temp );
        }
      } else {
        for(j = 0; j < temp.length; j++ ) {
          // When trying to use an array as a key to an object, it will
          // be converted to a string first. Fortunately, it will also
          // be converted to a string when you test the key. However,
          // if you have '1,2,3' and [ 1, 2, 3 ] in your set, the object
          // test will think they're the same object. Thus, the extra code.
          if( funk.isArray( temp[j] )) {
            if( !uniqueArrays[temp[j]] ) {
              uniqueArrays[temp[j]] = true;
              results.push(temp[j]);
            }
          } 
          // If it's not an array, check for uniqueness
          else if( !unique[temp[j]] ) {
            unique[temp[j]] = true;
            results.push( temp[j] );
          }
        }
      }
    }

    return results;
  };

  // Deep union -> like union put digs down

  // zip merges together the values of each of the arrays with the values
  // at the corresponding position. 
  // i.e. funk.zip( [1, 2], ['a', 'b'])
  // -> [[ 1, 'a' ], [ 2, 'b' ]]
  funk.zip = function() {
    var max_length = 0,
        results = [],
        i, j;

    // Check to see if more than one argument was passed into the method
    if( arguments.length === 1 ) {
      for( i = 0; i < arguments[0].length; i++ ) {
        results[i] = arguments[0][i];
      }
      return results;
    }

    // Find the longest array passed in and save that as it will
    // be the length of the result
    for( i = 0; i < arguments.length; i++ ) {
      if( arguments[i].length > max_length ) {
        max_length = arguments[i].length;
      }
    }

    // Iterate through all of the arrays in order and add
    // the elements into the results array at the corresponding
    // position
    for( i = 0; i < arguments.length; i++ ) {
      for( j = 0; j < arguments[i].length; j++ ) {
        if( results[j] === undefined ) {
          results[j] = [];
        }
        results[j].push( arguments[i][j] );
      }      
    }

    return results;
  };

  // Flatten flattens a nested array of any depth. Takes an optional
  // parameter of shallow. If true, the array will only be flattened
  // a single level.
  // i.e. funk.flatten( [[[[1]]], [2], 3]) -> [ 1, 2, 3 ]
  // or... funk.flatten( [[[1]], [2], 3]) -> [[1], 2, 3 ]
  var flatten = funk.flatten = function( array, shallow ) {
    var results = [];

    // Iterate through the array to check if it's an array
    each( array, function( value ) {
      if( isArray( value )) {
        // If value is an array, pass it into the _flattener function
        // which will flatten the array and push the elements to the 
        // results array.
        _flattener( value, shallow, function( value ) {
          results.push( value );
        });
      }
      else {
        // If value is not an array, push it to the results array
        results.push( value );
      }
    });

    return results;
  };

  // Helper function that takes an array, iterates through it,
  // and if the element is an array, it calls itself recursively
  // if shallow is not true, or it sends the element into the callback
  var _flattener = function( value, shallow, callback ) {
    // Check that the value is an array
    if( isArray( value ) ) {
      // Iterate through the array
      each( value, function( val ) {
        // If shallow is false and val is an array,
        // call flattener recursively
        if( !shallow && isArray( val )) {
          _flattener( val, false, callback );
        }
        // Otherwise, send val into the callback
        else {
          callback( val );
        }
      });
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
  var isArray = funk.isArray = function( value ) {
    return value instanceof Array;
  };

  // Checks to see if value is an object
  var isObject = funk.isObject = function( value ) {
    // See if value still equals itself if you turn it into an object
    return value === Object(value);
  };
  /*
    Another method to see if a value is an object would be the 
    typeof operator. However, the typeof operator will return
    'function' for Object and Function, which are actually objects.
  */

  // Values pulls all of the values out of an object
  funk.values = function( object ) {
    var results = [];
    // Iterate through the object
    for( var key in object ) {
      // If object is an object or array, it will push the
      // values to the results array. Otherwise, this will
      // not be called and an empty array will be returned
      results.push( object[key] );
    }

    return results;
  };

  // Keys pulls out all of the keys from an object
  funk.keys = function( object ) {
    var results = [];

    for( var key in object ) {
      // If object is an object or array, it will push the keys
      // to the results array. Otherwise, this will not be called
      // and an empty array will be returned;
      results.push( key );
    }

    return results;
  };

  // Invert takes an object and switches the values and the keys.
  // The values should be unique, or invert will overwrite them
  // when it gets to the next matching value.
  // i.e. { a: 1, b: 2 } -> { 1: 'a', 2: 'b' }
  funk.invert = function( object ) {
    var results = {};

    // Iterate through the object to flip keys and values
    for( var key in object ) {
      // If object is an object or array, it will set the key in 
      // results to be the value of object, and the value in results
      // to be the key in object. Otherwise, it will skip this
      // and return an empty object.
      results[ object[key] ] = key; 
    }

    return results;
  };

  // pick takes an object as it's first argument, and keys or 
  // arrays of keys as the subsequent arguments, and returns
  // an object with only those keys.
  funk.pick = function( object ) {
    var keys = [],
        results = {},
        i, key;

    // Iterate through the arguments, skipping the first, which
    // should be object, and push all of the keys to the keys
    // array.
    for( i = 1; i < arguments.length; i++ ) {
      // If the argument exists, continue
      if( arguments[i] != null ) {
        // If it's an array, go through each element and add
        // it to the keys array.
        if( isArray( arguments[i] )) {
          each( arguments[i], function( key ) {
            // The object's keys will be strings, so in order for
            // the indexOf function to identify matches, it will 
            // need to compare it with strings.
            keys.push( String(key) );
          });
        }
        else {
          // If the argument is not an array, convert it to a string
          // and push it to the keys array.
          keys.push( String(arguments[i]) );
        }
      }
    }

    // Iterate through the object to find all of the matching keys.
    // If it's a match, add the key and value to the results object.
    // Otherwise, ignore it.
    for( key in object ) {
      if( indexOf( keys, key ) !== -1 ) {
        results[key] = object[key];
      }
    }

    // Underscore will fire an error if pick is not passed an
    // array or object. This, however, returns an empty object
    // at the moment.
    return results;
  };

  // Extend copies all properties in the source arguments into the 
  // destination object, and returns the destination object. It's
  // in order, so if any properties are named the same thing, the
  // last one will be the one in the object
  // i.e. funk.extend( {a: 1}, {b: 2, c: 3}, { d: 4 } )
  // -> {a: 1, b: 2, c: 3, d: 4}
  // or... funk.extend( {a: 1}, {b: 2}, {b: 3} )
  // -> { a: 1, b: 3 }
  funk.extend = function( destination ) {
    // Iterate through the arguments, skipping the first,
    // to get all of the source objects
    for( var i = 1; i < arguments.length; i++ ) {
      // Iterate through all of the properties in the argument
      for( var key in arguments[i] ) {
        // and add it to the destination object
        destination[key] = arguments[i][key];
      }
    }

    // return the modified object
    return destination;
  };


/*
---------------Other Methods---------------
*/
  // Method to get a little funky and print 'Funky Town' to console
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





