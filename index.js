#!/usr/bin/env node

/*
Favico Generator.. Generates Favicons from Image files by Abdul <laisibizness@gmail.com>
*/

//  Lets start the party over here..
const fs = require('fs');
const argv = require('yargs')
  .usage('Usage: $0 option filename \n e.g $0 -f image.png -r 160x160')
  .alias('f', 'file')
  .alias('r', 'res')
  .nargs('f', 1)
  .nargs('r', 1)
  .describe('f', 'Loads file to be converted to favico')
  .describe('r', 'Specifies the width and height e.g 160x160')
  .demandOption(['f', 'r'])
  .help('h')
  .alias('h', 'help')
  .epilog('Copyright Abdul 2017').argv;

const convertImage = require('./src/lib/convertImage');
const downloadFile = require('./src/lib/downloadFile');

const favico = (from, to, args) =>
  fs.existsSync(from)
    ? convertImage(from, to, args)
    : downloadFile(from).then(file => convertImage(file, to, args));

favico(argv.file, 'favico.ico')
  .then(() =>
    console.log('Success, File saved as favico.ico in ' + process.cwd())
  )
  .catch(console.error);
