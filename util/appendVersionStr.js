
!function(){
	var VERSION = process.env.npm_package_version,
		LOCATION = process.env.CUSTOM_LOC,
		lRgx = /mergesort\.(?:[0-9]+\.){3}(?:evergreen|es5)\.js/i,
		injectVersion = /^(\s*)return\s+index\s*;(\s*)$/gim,
		fs = require('fs'),
		path = require('path'),
		files = fs.readdirSync(LOCATION).filter(fName => lRgx.test(fName)),
		filePaths = files.map(fileBase => path.join(LOCATION, fileBase));
	
	filePaths.forEach(file => {
		let data = fs.readFileSync(file, 'utf8');
		data = data.replace(injectVersion, function(m,startPad,endPad){
			return startPad 
			+ "index.version = \"" + VERSION + "\";" 
			+ endPad
			+ m;
		});
		fs.writeFileSync(file,data);
	});
}();