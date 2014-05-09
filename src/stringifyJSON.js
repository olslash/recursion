var stringifyJSON = function(obj) {
	function quote(str) {
		return '"' + str + '"';
	}

	var type = typeof obj;
	if (type === 'undefined' || type === 'function') {
		//ignore these.
		return "";
	} else if (type !== 'object' || obj === null) {
		//this is a number, boolean, or string.
		return type === 'string' ? quote(obj) : String(obj);
	} else {
		//this is an array or an object.
		var result = [];

		Object.keys(obj).forEach(function(e) {
			var val = obj[e];
			var valtype = typeof val;

			if (valtype === 'function' || valtype === 'undefined') {
				return "";
			}

			if (valtype === 'object' && val !== null) {
				//we need to recurse a sub object or array
				val = JSON.stringify(val);
			}

			var r;
			if (Array.isArray(obj)) {
				r = valtype === 'string' ? quote(val) : val;
			} else {
				r = quote(e) + ':' + (valtype === 'string' ? quote(val) : val);
			}
			result.push(r);
		});
		// surround result in brackets if obj is an array or braces if object
		return Array.isArray(obj) ? '[' + result + ']' : "{" + result + "}";
	}
};