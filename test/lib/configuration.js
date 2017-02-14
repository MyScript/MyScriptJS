const path = require('path');
const fs = require('fs');

const languages = require('./languages.json');
const system = require('./inks/system.json');
const one = require('./inks/one.json');
const equation = require('./inks/equation.json');
const equation2 = require('./inks/equation2.json');
const hello = require('./inks/hello.json');
const fourSquare = require('./inks/fourSquare.json');
const music = require('./inks/music.json');

const backendHost = process.env.BACKEND_URL || 'http://localhost:8080';
const resourcesFolder = process.env.NIGHTWATCH_RESOURCES_FOLDER || '../files';
const outputFolder = process.env.NIGHTWATCH_OUTPUT_FOLDER || './results';
const timeoutAmplificator = process.env.NIGHTWATCH_TIMEOUT_FACTOR || 1;

const inks = [{
  name: 'one',
  type: 'MATH',
  strokes: one,
  labels: ['1', '', '1', '']
}, {
  name: 'equation',
  type: 'MATH',
  strokes: equation,
  labels: [
    'r',
    '\\sqrt {2}'
  ]
}, {
  name: 'equation2',
  type: 'MATH',
  strokes: equation2,
  labels: ['-', '\\sqrt {2}', 'r', '']
}, {
  name: 'system',
  type: 'MATH',
  strokes: system,
  labels: [
    1, 2, 3, 4, 5,
    '\\int _{0}^{\\infty }\\sqrt {f(}',
    '\\int _{0}^{\\infty }\\sqrt {fb}',
    '\\int _{0}^{\\infty }\\sqrt {f(x}',
    '\\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }',
    '\\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }d',
    '\\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }d7',
    '\\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & c\\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos \\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos (\\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos (1\\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos (11\\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos (^{\\pi }\\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos (\\Updownarrow \\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos (\\dfrac {\\pi } {2}\\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos \\left( \\dfrac {\\pi } {2}\\right) \\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos \\left( \\dfrac {\\pi } {2}\\right) -\\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos \\left( \\dfrac {\\pi } {2}\\right) -2\\end{align*}',
    '\\begin{align*} & \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ & \\cos \\left( \\dfrac {\\pi } {2}\\right) ^{2}-2\\end{align*}',
    '\\begin{cases} \\int _{0}^{\\infty }\\sqrt {f\\left( x\\right) }dx\\\\ \\cos \\left( \\dfrac {\\pi } {2}\\right) ^{2}-2\\end{cases}'
  ]
}, {
  name: 'hello',
  type: 'TEXT',
  strokes: hello,
  labels: ['he', 'hel', 'hell', 'hello']
}, {
  name: 'shapeHello',
  type: 'SHAPE',
  strokes: hello,
  labels: ['notRecognized', 'line,notRecognized', 'line,line,notRecognized', 'circle,line,line,notRecognized']
}, {
  name: 'fourSquare',
  type: 'ANALYZER',
  strokes: fourSquare,
  labels: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
    'circle,ellipse,groups:2',
    'circle,ellipse,groups:2,isosceles triangle,rectangle,tables:2,txt:c. rd,txt:elipse,txt:rectangle,txt:triangle'
  ]
}, {
  name: 'music',
  type: 'MUSIC',
  strokes: music,
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '<step>F</step>', '<step>C</step>']
}];

const configurations = [{
  type: 'MATH',
  protocol: 'REST',
  apiVersion: 'V3',
  samples: ['/samples/rest_math.html'],
}, {
  type: 'MATH',
  protocol: 'WEBSOCKET',
  apiVersion: 'V3',
  samples: ['/samples/websocket_math.html'],
}, {
  type: 'TEXT',
  protocol: 'REST',
  apiVersion: 'V3',
  samples: ['/samples/rest_text.html'],
}, {
  type: 'TEXT',
  protocol: 'WEBSOCKET',
  apiVersion: 'V3',
  samples: ['/samples/websocket_text.html'],
}, {
  type: 'SHAPE',
  protocol: 'REST',
  apiVersion: 'V3',
  samples: ['/samples/rest_shape.html'],
}, {
  type: 'ANALYZER',
  protocol: 'REST',
  apiVersion: 'V3',
  samples: ['/samples/rest_analyzer.html'],
}, {
  type: 'MUSIC',
  protocol: 'REST',
  apiVersion: 'V3',
  samples: ['/samples/rest_music.html'],
}];

const walkSync = (dir, fileList) => {
  let fileListRef = fileList || [];
  fs.readdirSync(dir).forEach((file) => {
    const filename = `${dir}/${file}`;
    if (fs.statSync(filename).isDirectory()) {
      fileListRef = walkSync(filename, fileListRef);
    } else {
      fileListRef.push(filename);
    }
  });
  return fileListRef;
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function getConfiguration(type, protocol, apiVersion = 'V3') {
  return {
    type,
    protocol,
    apiVersion,
    header: [type, protocol, apiVersion].join('_'),
    componentPath: configurations
        .filter(sample => (sample.type === type && sample.protocol === protocol && sample.apiVersion === apiVersion))
        .map(sample => sample.samples)
        .reduce((a, b) => a.concat(b))
        .shift(),
    inks: inks
        .filter(ink => ink.type === type),
    getFiles: () => walkSync(path.resolve(resourcesFolder, type.toLowerCase()))
  };
}

module.exports = {
  languages,
  backendHost,
  resourcesFolder,
  outputFolder,
  timeoutAmplificator,
  getConfiguration
};
