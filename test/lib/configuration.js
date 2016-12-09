const path = require('path');
const fs = require('fs');

const languages = require('./languages.json');

const backendHost = process.env.BACKEND_URL || 'http://localhost:8080';
const resourcesFolder = process.env.NIGHTWATCH_RESOURCES_FOLDER || '../files';
const outputFolder = process.env.NIGHTWATCH_OUTPUT_FOLDER || '/results';
const timeoutAmplificator = process.env.NIGHTWATCH_TIMEOUT_FACTOR || 1;

const equation = [[[530, 533, 537, 538, 540, 541, 542, 544, 545, 546, 548, 548, 552, 555, 558, 561, 565, 569, 573, 577, 582, 583, 585, 588, 589, 591, 593, 593, 593, 592, 591, 591, 590, 589, 588, 593, 598, 604, 613, 627, 646, 665, 682, 697, 713, 727, 738, 745, 751, 756, 762, 768, 772], [93, 95, 99, 102, 107, 112, 117, 123, 127, 130, 133, 136, 138, 141, 143, 144, 144, 141, 136, 130, 124, 118, 112, 107, 101, 95, 90, 84, 79, 76, 72, 68, 64, 59, 55, 54, 54, 54, 54, 54, 52, 52, 49, 49, 49, 49, 49, 49, 49, 49, 49, 48, 48]], [[669, 666, 665, 665, 668, 672, 676, 680, 684, 687, 689, 689, 690, 690, 688, 686, 684, 681, 678, 675, 670, 667, 664, 661, 658, 655, 654, 657, 661, 664, 668, 672, 677, 682, 689, 700, 712, 720, 723, 720], [81, 80, 77, 74, 75, 76, 77, 79, 81, 84, 87, 90, 93, 97, 102, 105, 109, 112, 114, 118, 121, 123, 125, 127, 130, 133, 136, 137, 138, 138, 138, 138, 138, 137, 136, 136, 135, 133, 133, 132]]];

const hello = [[[29, 29, 29, 30, 30, 31, 32, 33, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 40, 43, 45, 48, 50, 53, 56, 59, 62, 65, 68, 70, 71, 72, 72, 73, 75, 78, 83, 90, 97, 104, 112, 118, 124, 129, 131, 132, 131, 129, 126, 123, 119, 115, 111, 109, 109, 111, 115, 120, 126, 133, 139, 145, 151], [12, 16, 20, 28, 37, 49, 62, 76, 89, 102, 113, 121, 127, 131, 128, 121, 110, 97, 83, 72, 63, 56, 52, 49, 48, 48, 50, 54, 60, 68, 77, 87, 96, 104, 109, 113, 117, 119, 119, 117, 114, 108, 101, 94, 86, 78, 71, 64, 60, 59, 62, 68, 77, 88, 98, 107, 113, 117, 119, 120, 120, 117, 113]], [[164, 164, 165, 165, 165, 166, 167, 169, 170, 171, 173, 174, 175], [26, 30, 36, 44, 52, 62, 71, 81, 91, 99, 107, 113, 117]], [[199, 199, 199, 199, 200, 201, 203, 205, 207, 209, 211, 213, 215, 216], [20, 25, 30, 36, 44, 52, 61, 71, 81, 92, 102, 111, 116, 119]], [[263, 263, 259, 255, 251, 246, 242, 239, 236, 234, 233, 234, 236, 241, 248, 257, 268, 279, 289, 295, 298, 297, 293, 287, 281, 274, 267], [65, 62, 60, 60, 60, 62, 66, 70, 76, 84, 91, 99, 106, 113, 119, 122, 123, 121, 116, 109, 100, 91, 83, 75, 70, 66, 65]]];


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

const commonConfig = {
  componentPath: '/common_demo/bower_components/myscript-common-element/demo/index.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'common'))
};
const mathConfig = {
  componentPath: '/math_demo/bower_components/myscript-math-web/demo/index.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'math'))
};
const superimposedConfig = {
  componentPath: '/text_demo/bower_components/myscript-text-web/demo/superimposed.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text/superimposed'))
};
const textConfig = {
  componentPath: '/text_demo/bower_components/myscript-text-web/demo/index.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text/multiline'))
};

const mathRestSample = {
  componentPath: '/samples/rest_math.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'math')),
  inks: [{ strokes: equation, labels: ['r', '\\sqrt {2}'] }],
};
const mathWSSample = {
  componentPath: '/samples/websocket_math.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'math')),
  inks: [{ strokes: equation, labels: ['r', '\\sqrt {2}'] }],
};
const textRestSample = {
  componentPath: '/samples/rest_text.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text')),
  inks: [{ strokes: hello, labels: ['he', 'hel', 'hell', 'hello'] }],
};

const textWSSample = {
  componentPath: '/samples/websocket_text.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text')),
  inks: [{ strokes: hello, labels: ['he', 'hel', 'hell', 'hello'] }],
};
const shapeRestSample = {
  componentPath: '/samples/rest_shape.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text')),
  inks: [{ strokes: hello, labels: ['notRecognized', 'line,notRecognized', 'line,line,notRecognized', 'circle,line,line,notRecognized'] }],
};
const analyzerRestSample = {
  componentPath: '/samples/rest_analyzer.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text')),
  inks: [{ strokes: hello, labels: ['groups:0,txt:he', 'groups:0,txt:hel', 'groups:0,txt:hell', 'groups:0,txt:hello'] }],
};
const musicRestSample = {
  componentPath: '/samples/rest_music.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text')),
  inks: [{ strokes: hello, labels: ['he', 'hel', 'hell', 'hello'] }],
};

module.exports = {
  languages,
  backendHost,
  resourcesFolder,
  outputFolder,
  timeoutAmplificator,
  commonConfig,
  mathConfig,
  superimposedConfig,
  textConfig,
  mathRestSample,
  mathWSSample,
  textRestSample,
  textWSSample,
  shapeRestSample,
  musicRestSample,
  analyzerRestSample
};
