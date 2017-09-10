// #!/usr/bin/env node

// var path          = require('path'),
//     fs            = require('fs'),
//     shell         = require('shelljs');

//  linkFromTemplate('../../www', './');

// /**
//  * Removes existing files and symlinks them if they exist.
//  * Symlinks folders: www, merges, hooks 
//  * Symlinks file: config.xml (but only if it exists outside of the www folder)
//  * If config.xml exists inside of template/www, COPY (not link) it to project/
//  * */
//  function linkFromTemplate(templateDir, projectDir) {
//     var linkSrc, linkDst, linkFolders, copySrc, copyDst;
//     function rmlinkSync(src, dst, type) {
//         if (src && dst) {
//             if (fs.existsSync(dst)) {
//                 shell.rm('-rf', dst);
//             }
//             if (fs.existsSync(src)) {
//                 fs.symlinkSync(src, dst, type);
//             }
//         }
//     } 
//     // if template is a www dir
//     if (path.basename(templateDir) === 'www') {
//         linkSrc = path.resolve(templateDir);
//         linkDst = path.join(projectDir, 'www');
//         rmlinkSync(linkSrc, linkDst, 'dir');
//     }
//  }