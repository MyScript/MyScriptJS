const path = require('path');
const fs = require('fs');
const readline = require('readline');

function create2DArray(rows) {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
  }
  return arr;
}

function computeLevenshteinDistance(str1, str2) {
  const distance = create2DArray(str1.length + 1);
  for (let i = 0; i <= str1.length; i++) {
    distance[i][0] = i;
  }
  for (let j = 1; j <= str2.length; j++) {
    distance[0][j] = j;
  }
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      distance[i][j] = Math.min(distance[i - 1][j] + 1, distance[i][j - 1] + 1, distance[i - 1][j - 1]
                                + ((str1[i - 1] === str2[j - 1]) ? 0 : 1));
    }
  }
  return distance[str1.length][str2.length];
}

function computeLevenshteinPercent(str1, str2) {
  if (str1 === null || str2 === null) {
    return 100.0;
  }
  return 100.0 - (computeLevenshteinDistance(str1, str2) * (100.0 / (Math.max(str1.length, str2.length))));
}

function parseItf(file) {
  return new Promise((resolve, reject) => {
    if (!fs.lstatSync(file).isFile()) {
      reject('file is not a file');
      return;
    }

    const orders = [];
    const results = {};
    let stroke;
    const lineReader = readline.createInterface({ input: fs.createReadStream(file) });

    lineReader.on('line', (line) => {
      if (line.startsWith('#?')) {
        // Add expected result to orders
        const rawResult = line.slice(2).split(':');
        results[rawResult.shift()] = rawResult.join(':');
      } else if (line.startsWith('#!')) {
        if (line.indexOf('undo') !== -1) {
          orders.push('undo');
        } else if (line.indexOf('redo') !== -1) {
          orders.push('redo');
        } else if (line.indexOf('clear') !== -1) {
          orders.push('clear');
        }
      } else if (line.startsWith('AddStroke')) {
        if (stroke && stroke[0].length > 0) {
          orders.push(stroke);
        }
        stroke = create2DArray(2);
      } else if (line.match(/^(([+-]?\d+(\.\d+)?)\s*){2,6}$/)) {
        // Add point
        const xy = line.split(/\s+/);
        stroke[0].push(parseFloat(xy[0]) / 2);
        stroke[1].push(parseFloat(xy[1]) / 2);
      }
    });

    lineReader.on('close', () => {
      if (stroke[0].length > 0) {
        orders.push(stroke);
      }
      // FIXME: Ugly hack to transform MIME types
      if (results.MathML) {
        results['application/mathml+xml'] = results.MathML;
        delete results.MathML;
      }
      if (results.LaTeX) {
        results['application/x-latex'] = results.LaTeX;
        delete results.LaTeX;
      }
      resolve({ language: path.parse(file).name.substr(-5), results, orders });
    });
  });
}

module.exports = {
  parseItf,
  computeLevenshteinPercent
};
