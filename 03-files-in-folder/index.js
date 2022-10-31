
const path = require('path');
const fs = require('fs');
const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, (err, files) => {
  files.forEach(file => {
    let fullName = path.join(secretFolder, file);
      fs.stat(fullName, (err, stats) => {
      if (stats.isFile()) {
        let fileName = file.split('.')[0];
        let fileSize = (stats.size / 1024).toFixed(2);
        let ext = '';
        ext = path.extname(file).slice(1); 
        console.log(`${fileName} - ${ext} - ${fileSize}kb`)
      }
    });
  });
})






