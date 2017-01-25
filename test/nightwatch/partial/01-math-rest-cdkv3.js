const config = require('../../lib/configuration');
const inkPlayer = require('../lib/inkPlayer');

const timeoutAmplificator = config.timeoutAmplificator;
const mathConfig = config.mathRestSample;
const mathScratchOutConfig = config.mathScratchOutRestSample;
const mathClearUndoConfig = config.mathClearUndoRestSample;

module.exports['Math rest very simple test'] = function (browser) {
  mathConfig.inks.forEach((ink) => {
    inkPlayer.playInk(browser, mathConfig, ink.strokes, ink.labels);
  });
};

module.exports['Math rest clear undo test'] = function (browser) {
  mathClearUndoConfig.inks.forEach((ink) => {
    inkPlayer.playInkClearUndo(browser, mathClearUndoConfig, ink.strokes, ink.labels)
  });
}

module.exports['Math rest scratch out test'] = function (browser) {
  mathScratchOutConfig.inks.forEach((ink) => {
    inkPlayer.playInk(browser, mathScratchOutConfig, ink.strokes, ink.labels);
  });
};

