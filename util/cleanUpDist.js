
!function(){
	var VERSION = process.env.npm_package_version,
		LOCATION = process.env.CUSTOM_LOC,
		fRgx = /^mergesort\.(?:[0-9]+\.){3}(?:es5|evergreen)\./i,
		fs = require('fs'),
		fsPromises = fs.promises,
		refPromise = {v: Promise.resolve()},
		path = require('path'),
		files = fs.readdirSync(LOCATION)
			.forEach(fName => {
				if(fRgx.test(fName)) {
					var source = path.join(LOCATION, fName);
					refPromise.v = refPromise.v.then(function(){
						return fsPromises.unlink(source);
					});
				}
			},refPromise);
}();