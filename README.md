##NOOBjs Funk

NOOBjs Funk is a utility library that takes all of the functionality of Underscore.js and tries to dumb down the code so that the noob can really understand what's going on under the hood.

NOOBjs Funk is not as performant as Underscore or Lo-Dash and should not be used in production, but it is hopefully more readable. The methods were implemented from scratch and still need to be refactored, so you can consider this a work in progress. Keep in mind that the goal is readability, not performance. Also, for better or for worse, this library tries to mimick Underscore's response to faulty inputs as closely as possible, which ranges from throwing an error to returning an empty object or array.

####Acknowledgements: 

Thanks to all of the contributors to [Underscore](http://underscorejs.org/). This library mimicks Underscore as closely as possible and shares some of the same code, and the goal is that you'd be able to replaced NOOBjs Funk with Underscore if your site went into production.
