const path = require('path');
const fs = require("fs/promises");
const from = path.join(__dirname, 'files');
const to = path.join(__dirname, 'files-copy');


async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  let entries = await fs.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ?
      await copyDir(srcPath, destPath) :
      await fs.copyFile(srcPath, destPath);
  }
}

copyDir(from, to);


// Sync ver:
// function isExist(dir) {
//   return fs.existsSync(dir)
// }

// function emptyDestDir(directory) {
//   fs.readdir(directory, (err, files) => {
//     if (err) throw err;
  
//     for (const file of files) {
//       fs.unlink(path.join(directory, file), (err) => {
//         if (err) throw err;
//       });
//     }
//   })
// } 

// function copyDir(from, to) {
//   if (isExist(to)) {
//     console.log('Directory already exist and will be overwritten');
//     emptyDestDir(to);
//   } else {
//     fs.mkdirSync(to);
//   }
//   setTimeout(() => {
//     fs.readdirSync(from).forEach(element => {
//       if (fs.lstatSync(path.join(from, element)).isFile()) {
//         fs.copyFileSync(path.join(from, element), path.join(to, element));
//       } else {
//         copyDir(path.join(from, element), path.join(to, element));
//       }
//     });
//     console.log('Copy done!');
//   }, 2000);
// }
// copyDir(from, to);