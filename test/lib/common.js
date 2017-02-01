const fs = require('fs');
const readline = require('readline');
const async = require('async');
const languages = require('./languages.json');

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

function getOrdersFromItfFile(file) {
  return new Promise((resolve, reject) => {
    if (!fs.lstatSync(file).isFile()) {
      reject('file is not a file');
      return;
    }

    const orders = [];
    const expectedResults = [];
    const expectedResultTypes = [];
    let stroke = create2DArray(2);
    const lineReader = readline.createInterface({ input: fs.createReadStream(file) });

    lineReader.on('line', (line) => {
      if (line.startsWith('#?')) {
        // Add expected result to orders
        const rawResult = line.slice(2).split(':');
        expectedResultTypes.push(rawResult.shift());
        expectedResults.push(rawResult.join(':'));
      } else if (line.startsWith('#!')) {
        if (line.indexOf('undo') !== -1) {
          orders.push({ stroke: [-1][-1] });
        } else if (line.indexOf('redo') !== -1) {
          orders.push({ stroke: [1][1] });
        } else if (line.indexOf('clear') !== -1) {
          orders.push({ stroke: [0][0] });
        }
      } else if (line.startsWith('AddStroke')) {
        if (stroke[0].length > 0) {
          orders.push({ stroke });
          stroke = create2DArray(2);
        }
      } else if (line.match(/^(([+-]?\d+(\.\d+)?)\s*){2,6}$/)) {
        // Add point
        const xy = line.split(/\s+/);
        stroke[0].push(parseFloat(xy[0]) / 2);
        stroke[1].push(parseFloat(xy[1]) / 2);
      }
    });

    lineReader.on('close', () => {
      if (stroke[0].length > 0) {
        orders.push({ expectedResultTypes, expectedResults, stroke });
      }

      resolve(orders);
    });
  });
}

function getLanguageFromFile(file) {
  const n = file.indexOf('.itf') - 5;
  const lang = file.substr(n, 5);
  let result = null;
  languages.forEach((language) => {
    if (language.value === lang) {
      // console.info(JSON.stringify(language));
      result = language;
    }
  });
  return result;
}

function getSubsets(array) { // cf powerset custom on internet
  if (array.length === 1) {
    // return the single item set plus the empty set
    return [array, []];
  }
  const e = array.pop();
  const s = getSubsets(array);
  // duplicate the elements of s into s1 without creating references.
  // this might not be the best technique
  const s1 = s.concat(JSON.parse(JSON.stringify(s)));
  // add e to the second group of duplicates
  for (let i = s.length; i < s1.length; i++) {
    s1[i].push(e);
  }
  return s1;
}

function getExpectedResultsFromOrders(orders) {
  return orders
      .filter(order => order.expectedResults !== undefined)
      .map((order) => {
        const expectedRes = {};
        for (let i = 0; i < order.expectedResultTypes.length; i++) {
          expectedRes[order.expectedResultTypes[i].toUpperCase()] = order.expectedResults[i];
        }
        return expectedRes;
      })
      .reduce((orderA, orderB) => {
        const order = Object.assign({}, orderA, orderB);
        Object.keys(order).forEach((key) => {
          order[key] = [...orderA[key], ...orderB[key]];
        });
        return order;
      });
}

function getRawStrokesFromOrders(orders) {
  return orders.filter(order => order.stroke !== undefined).map(order => order.stroke);
}

module.exports = {
  Utils: {
    computeLevenshteinPercent,
    getLanguageFromFile,
    getOrdersFromItfFile,
    getSubsets,
    getExpectedResultsFromOrders,
    getRawStrokesFromOrders
  }
};
