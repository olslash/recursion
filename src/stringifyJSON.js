// this is what you would do if you liked things to be easy:
//var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
// var stringifyJSON = function(obj) {
//   // your code goes here
//   console.log("this should return: ");
//   console.log(JSON.stringify(obj));


//   // check type
//   // typeof === undefined || function?
//   // // skip
//   // isArray?
//   // typeof === object?
//   // otherwise, it's a string, number or boolean

//   if (typeof obj === "undefined" || typeof obj === "function") {
//   	// skip undefined values or functions
//   } else if (typeof obj != "object") {
//   	// we got us a number, boolean, or string, so simple
		// get this to the top somehow to avoid unnecessary checking?
//   } else {
//		object or array. careful because null is an object.
//		Use a for loop because for/in is bad for arrays. Object.keys(array or object).forEach?
//		iterate it
//			if the type of object we hit here is another object or array, recurse back
			//push result into a data structure.
//   }

// };

//if a *value* is undefined, or a function, ignore that key completely
//null turns to "null"


var stringifyJSON = function (obj) {
	var type = typeof obj;
	if (type === 'undefined' || type === 'function') {
		//ignore these.
		//console.log("ignoring: " + obj);
		return "";
	} else if (type !== 'object' || obj === null) {
		//this is a number, boolean, or string.
		//console.log("null, number, boolean, or string");
		// Just need to return the value.
		return String(obj); // TODO: quotes?
	} else {
		//this is an array or an object.
		//check the value of the key. if undefined, we ignore the whole key.
		//console.log("array or object");
		var result = [];
		Object.keys(obj).forEach(function(e) { // Iterate over each item in the array or object		
			var etype = typeof e;
			var val = obj[e];

			if (etype === 'object' && val !== null) {
				//we need to recurse
				val = JSON.stringify(val);
			}

			result.push(e + ':' + '"' + val + '"'); // TODO: don't need keyname (e) if this is an array! Also, needs brackets
			//if e is null, number, boolean, or string, push into result.
		});
		// return the result
		return result;
	}
};
var stringifiableObjects = [
  // 9,
  // null,
  // true,
  // false,
  // "Hello world",
  //above are good
  [],
  [8],
  ["hi"],
  [8, "hi"],
  [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
  [8, [[],3,4]], //issue here
  [[[["foo"]]]],
  {},
  {"a": "apple"},
  {"foo": true, "bar": false, "baz": null},
  {"boolean, true": true, "boolean, false": false, "null": null },
  // basic nesting
  {"a":{"b":"c"}},
  {"a":["b", "c"]},
  [{"a":"b"}, {"c":"d"}],
  {"a":[],"c": {}, "b": true}
];

// used for stringifyJSON spec
// hint: JSON does not allow you to stringify functions or
// undefined values, so you should skip those key/value pairs.
unstringifiableValues = [
  {
    'functions': function(){},
    'undefined': undefined
  }
];

stringifiableObjects.forEach(function(e){
	console.log(stringifyJSON(e));
});

