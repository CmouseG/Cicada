var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

var clean = function(path) {
	// shell.exec('rm -rf ../../../dist/vue', function(err) {
	// 	if (err) {
	// 		throw err;
	// 	}
	// });
	shell.rm('-rf', path, function(err) {
		if (err) {
			throw err;
		}
	});
};


/**
 * copy sync
 */

 var copySync = function(src, dst) {
 	var paths = fs.readdirSync(src);
 	paths.forEach(function(path) {
		var _src = src + '/' + path,
			_dst = dst + '/' + path,
			stat,
			fileReadStream,
			fileWriteStream;

		stat = fs.statSync(_src);
		if(stat.isFile()) {
			fileReadStream = fs.createReadStream(_src);
			fileWriteStream = fs.createWriteStream(_dst);
				fileReadStream.on('data',function(data){
		    	fileWriteStream.write(data);
			});

			fileReadStream.on('end',function(){
			    fileWriteStream.end();
			});
		} else if (stat.isDirectory()) {
			existsSync(_src, _dst, copySync);
		}
 	});
 };

 var existsSync = function(src, dst, callback) {
 	if(fs.existsSync(dst)) {
 		callback(src, dst);
 	} else {
 		fs.mkdirSync(dst);
 		callback(src, dst);
 	}
 };



clean('../../dist/www/vue');
existsSync('./dist', '../../dist/www/vue', copySync);