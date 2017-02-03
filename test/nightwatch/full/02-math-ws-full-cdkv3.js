const config = require('../../lib/configuration');
const inkPlayer = require('../lib/inkPlayerFull');

const mathConfig = config.mathWSSample;
const mathScratchOutConfig = config.mathScratchOutWSSample;
const mathClearUndoConfig = config.mathClearUndoWSSample;

module.exports['Math websocket very simple test'] = function simple(browser) {
  mathConfig.inks.forEach(ink => inkPlayer.playInk(browser, mathConfig, ink.strokes, ink.labels));
};

module.exports['Math websocket clear undo test'] = function clearUndo(browser) {
  mathClearUndoConfig.inks.forEach(ink => inkPlayer.playInkClearUndo(browser, mathClearUndoConfig, ink.strokes, ink.labels));
};

module.exports['Math websocket scratch out test'] = function scratchOut(browser) {
  mathScratchOutConfig.inks.forEach(ink => inkPlayer.playInk(browser, mathScratchOutConfig, ink.strokes, ink.labels));
};

module.exports['Math WS multiple undo test'] = function multipleUndo(browser) {
  mathConfig.inks.forEach(ink => inkPlayer.playInkMultipleUndos(browser, mathConfig, ink.strokes, ink.labels));
};
