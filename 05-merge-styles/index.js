const fs = require("fs");
const path = require("path");

const from = path.join(__dirname, 'styles');
const dest = path.join(__dirname, 'project-dist/bundle.css');

function bundle(directory, destination) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    files = files.map(file => path.join(directory, file));
    let cssOnly = [];
    files.forEach(file => {
      if (path.extname(file) === '.css') {
        cssOnly.push(file);
      }
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

bundle(from, dest)