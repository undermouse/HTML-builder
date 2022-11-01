const path = require("path");
const fsp = require("fs/promises");
const fs = require('fs');
const fromAssets = path.join(__dirname, 'assets');
const toAssets = path.join(__dirname, 'project-dist/assets');
const cssSource = path.join(__dirname, 'styles');
const mergedCss = path.join(__dirname, 'project-dist/style.css');


async function copyAssets(src, dest) {
  await fsp.mkdir(dest, { recursive: true });
  let entries = await fsp.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ?
      await copyAssets(srcPath, destPath) :
      await fsp.copyFile(srcPath, destPath);
  }
}

function mergeStyles(src, dest) {
  fs.readdir(src, (err, files) => {
    if (err) throw err;
    files = files.map(file => path.join(src, file));
    let cssOnly = [];
    files.forEach(file => {
        cssOnly.push(file);
    });
    for (let i = 0; i < cssOnly.length; i++) {
      let readStream = fs.createReadStream(cssOnly[i], 'utf-8');
      readStream.on('data', (chunk) => {
        fs.appendFile(dest, chunk, 'utf-8', (err) => {
          if (err) throw new Error(err.message);
        });
      });
    };
  });
}


copyAssets(fromAssets, toAssets);
mergeStyles(cssSource, mergedCss);


