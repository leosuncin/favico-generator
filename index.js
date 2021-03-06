#!/usr/bin/env node

/*
Favico Generator.. Generates Favicons from Image files by Abdul <laisibizness@gmail.com>
*/

//  Lets start the party over here..
const url = require("url");
const path = require("path");
const request = require('request');
const im = require('imagemagick');
const fs = require('fs');
const argv = require('yargs')
  .usage('Usage: $0 option filename \n e.g $0 -f image.png -r 160x160')
  .alias('f', 'file')
  .alias('r', 'res')
  .nargs('f', 1)
  .nargs('r', 1)
  .describe('f', 'Loads file to be converted to favico')
  .describe('r', 'Specifies the width and height e.g 160x160')
  .demandOption(['f'])
  .demandOption(['r'])
  .help('h')
  .alias('h', 'help')
  .epilog('Copyright Abdul 2017')
  .argv;

let s = null;

const convertImage = (buf) => im.convert([
  argv.file, '-resize', argv.res, 'favico.ico'
], function (err, stdout) {
  if (err) throw err;

  console.log('Success, File saved as favico.ico in ' + process.cwd());
});

const readFile = (file) => {
  const s = fs.createReadStream(argv.file);
  s.on('data', convertImage);
}

const readUrl = (urlPath) => {
  const parsedUrl = url.parse(urlPath);
  const filename = path.basename(parsedUrl.pathname);
  const writableStream = fs.createWriteStream(filename);
  request(urlPath).pipe(writableStream);

  writableStream.on('finish', (res) => {
    convertImage(filename);
  });
}

try {
  if (fs.existsSync(argv.file)) {
    readFile(argv.file);
  } else {
    readUrl(argv.file);
  }
} catch(e) {
  throw e;
}
