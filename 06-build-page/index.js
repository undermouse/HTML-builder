const path = require("path");
const fsp = require("fs/promises");
const fs = require('fs');
const finalDestination = path.join(__dirname, 'project-dist/index.html');
const fromAssets = path.join(__dirname, 'assets');
const toAssets = path.join(__dirname, 'project-dist/assets');
const cssSource = path.join(__dirname, 'styles');
const mergedCss = path.join(__dirname, 'project-dist/style.css');
const template = path.join(__dirname, 'template.html');
const header = path.join(__dirname, 'components/header.html');
const articles = path.join(__dirname, 'components/articles.html');
const footer = path.join(__dirname, 'components/footer.html');

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

function buildHTML() {
  fs.readFile(template, 'utf-8', (err, dataTemplate) => {
    if (err) throw err;
    let res = dataTemplate;
    fs.readFile(header, 'utf-8', (err, dataHeader) => {
      if (err) throw err;
      res = res.replace('{{header}}', dataHeader);
    });
    fs.readFile(articles, 'utf-8', (err, dataArticle) => {
      if (err) throw err;
      res = res.replace('{{articles}}', dataArticle);
    });
    fs.readFile(footer, 'utf-8', (err, dataFooter) => {
      if (err) throw err;
      res = res.replace('{{footer}}', dataFooter);
      // Write all in index.html
      fs.writeFile(finalDestination, res, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    });
  });
}

copyAssets(fromAssets, toAssets);
mergeStyles(cssSource, mergedCss);
buildHTML();

