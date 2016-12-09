const path = require('path');
const fs = require('fs');
const readline = require('readline');

const file = '/home/padewitte/projets/NewMyScriptJS/target/music_basic_1.ink';
const lineReader = readline.createInterface({ input: fs.createReadStream(file) });

const strokes = [];
let x = [];
let y = [];
let nbPoints = 0;

lineReader.on('line', (line) => {
  if (line.indexOf(' ') === -1) {
    if (x.length > 0 && y.length > 0) {
      strokes.push([x, y]);
    }
    x = [];
    y = [];
    console.log('### => ' + line);
  } else {
    nbPoints++;
    if ((nbPoints % 3) === 0) {
      const splittedCoord = line.split(' ');
      x.push(Number.parseInt(((0 + (Number.parseInt(splittedCoord[0], 0))) / 1), 0));
      y.push(Number.parseInt(((-252 + (Number.parseInt(splittedCoord[1], 0))) / 1), 0));
      console.log('*** => ' + splittedCoord);
    }
  }
});

lineReader.on('close', () => {
  strokes.shift();
  strokes.shift();
  strokes.shift();
  strokes.shift();
  strokes.shift();
  strokes.shift();
  strokes.shift();
  strokes.shift();
  strokes.shift();
  strokes.shift();
  strokes.shift();

  process.stdout.write(JSON.stringify(strokes));
});

