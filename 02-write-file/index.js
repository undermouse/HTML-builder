const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const outputPath = path.join(__dirname, 'destination.txt');

fs.writeFile(outputPath, '', function (err) {
  if (err) throw err;
});
stdout.write('Enter text to add: ' + '(enter "Exit" to close app)\n')
const output = fs.createWriteStream(outputPath);
stdin.on('data', chunk => {
  if (chunk.toString().toLowerCase() === 'exit\r\n') {
    console.log('See ya next time!');
    process.exit();
  }
 
  output.write(chunk);
});

process.on('SIGINT', () =>  {
  console.log('See you next time!');
  process.exit();
})


output.on('error', error => console.log('Error', error.message));




