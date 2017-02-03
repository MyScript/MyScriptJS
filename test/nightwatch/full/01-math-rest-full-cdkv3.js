const config = require('../../lib/configuration');
const inkPlayer = require('../lib/inkPlayerFull');

const mathConfig = config.mathRestSample;
const mathScratchOutConfig = config.mathScratchOutRestSample;
const mathClearUndoConfig = config.mathClearUndoRestSample;

module.exports['Math rest very simple test'] = function simple(browser) {
  mathConfig.inks.forEach(ink => inkPlayer.playInk(browser, mathConfig, ink.strokes, ink.labels));
};

module.exports['Math rest clear undo test'] = function clearUndo(browser) {
  mathClearUndoConfig.inks.forEach(ink => inkPlayer.playInkClearUndo(browser, mathClearUndoConfig, ink.strokes, ink.labels));
};

module.exports['Math rest scratch out test'] = function scratchOut(browser) {
  mathScratchOutConfig.inks.forEach(ink => inkPlayer.playInk(browser, mathScratchOutConfig, ink.strokes, ink.labels));
};

module.exports['Math rest multiple undo test'] = function multipleUndo(browser) {
  mathConfig.inks.forEach(ink => inkPlayer.playInkMultipleUndos(browser, mathConfig, ink.strokes, ink.labels));
};
