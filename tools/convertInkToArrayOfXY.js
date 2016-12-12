const path = require('path');
const fs = require('fs');
const readline = require('readline');

const file = '/home/padewitte/projets/NewMyScriptJS/target/FourShapeText.ink';
const lineReader = readline.createInterface({ input: fs.createReadStream(file) });

const strokes = [];
let x = [];
let y = [];
let nbPoints = 0;
let minX = 1000;
let maxX = -1000;
let minY = 1000;
let maxY = -1000;


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
    if ((nbPoints % 2) === 0) {
      const splittedCoord = line.split(' ');
      const newX = Number.parseInt(((0 + (Number.parseInt(splittedCoord[0], 0))) / 1), 0);
      x.push(newX);
      const newY = Number.parseInt(((-100 + (Number.parseInt(splittedCoord[1], 0))) / 1), 0);
      y.push(newY);
      if (newX > maxX) maxX = newX;
      if (newX < minX) minX = newX;
      if (newY > maxY) maxY = newY;
      if (newY < minY) minY = newY;
      console.log('*** => ' + splittedCoord);
    }
  }
});

lineReader.on('close', () => {
  console.log({ minX, maxX, minY, maxY });
  process.stdout.write(JSON.stringify(strokes));
});

