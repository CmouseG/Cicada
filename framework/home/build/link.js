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


// var clean = function(path) {
// 	// var files = [];
// 	// if(fs.exists(path)) {
// 	// 	files = fs.readdir(path);
// 	// 	files.forEach(function(file, index) {
// 	// 		var curPath = path + '/' + file;
// 	// 		if(fs.stat(curPath).isDirectory()) {
// 	// 			clean(curPath);
// 	// 		} else {
// 	// 			fs.unlink(curPath);
// 	// 		}
// 	// 	});
// 	// 	fs.rmdir(path);
// 	// }
// 	fs.readdir(path, function(err, files) {
// 		if(err) {
// 			throw err;
// 		}
// 		files.forEach(function(file) {
// 			var _file = path + '/' + file;
// 			// if (fs.stat(_file).isDirectory()) {
// 			// 	clean(_file);
// 			// } else {
// 			// 	fs.unlink(_file);
// 			// }
// 			fs.stat(_file, function(err, st) {
// 				if(err) {
// 					throw err;
// 				}
// 				if(st.isDirectory()) {
// 					clean(_file);
// 				} else {
// 					fs.unlink(_file);
// 				}
// 			});
// 		});
// 		fs.rmdir(path);
// 	})
// };

/**
 * copy async
 */

var copy = function(src, dst) {
	fs.readdir(src, function(err, paths) {
		if (err) {
			throw err;
		}
		paths.forEach(function(path) {
			var _src = src + '/' + path,
				_dst = dst + '/' + path,
				readable,
				writeable;

			fs.stat(_src, function(err, st) {
				if(err) {
					throw err;
				}
				if(st.isFile()) {
					readable = fs.createReadStream(_src);
					writeable = fs.createWriteStream(_dst);
					readable
						.pipe(writeable)
						.on('error', function(e){
							throw e;
						});
				} else if (st.isDirectory()) {
					exists(_src, _dst, copy);
				}
			});

		});
	})
};

var exists = function(src, dst, callback) {
	fs.exists(dst, function(exists) {
		if (exists) {
			callback(src, dst);
		} else {
			fs.mkdir(dst, function() {
				callback(src, dst);
			})
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


var link = function(templateDir, projectDir) {
	var linkSrc, linkDst, linkFolders, copySrc, copyDst;
    function rmlinkSync(src, dst, type) {
        if (src && dst) {
            if (fs.existsSync(dst)) {
                shell.rm('-rf', dst);
            }
            if (fs.existsSync(src)) {
                fs.symlinkSync(src, dst, type);
            }
        }
    }
    // if template is a www dir
    if (path.basename(templateDir) === 'www') {
        linkSrc = path.resolve(templateDir);
        linkDst = path.join(projectDir, 'www');
        rmlinkSync(linkSrc, linkDst, 'dir');
    }
};

// node link.js
// clean('../../../dist/vue/www');
// // exists('../dist', '../../../dist/vue/www', copy);
// existsSync('../dist', '../../../dist/vue/www', copySync);
// link('../../../dist/vue/www', '../../../container/cordova');


// npm run link
clean('../../dist/home/www');
// exists('../dist', '../../../dist/home/www', copy);
existsSync('./dist', '../../dist/home/www', copySync);
link('../../dist/home/www', '../../container/cordova');