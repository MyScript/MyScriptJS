const config = require('../../../lib/configuration');
const inkPlayer = require('../../lib/inkPlayer');

const mathConfig = config.mathRestSample;

module.exports['Math rest very simple test'] = function simple(browser) {
  mathConfig.inks
      .filter(ink => ink.name === 'equation')
      .forEach(ink => inkPlayer.playInk(browser, mathConfig, ink.strokes, ink.labels));
};

module.exports['Math rest clear undo test'] = function clearUndo(browser) {
  mathConfig.inks
      .filter(ink => ink.name === 'one')
      .forEach(ink => inkPlayer.playInkClearUndo(browser, mathConfig, ink.strokes, ink.labels));
};

module.exports['Math rest scratch out test'] = function scratchOut(browser) {
  mathConfig.inks
      .filter(ink => ink.name === 'equation2')
      .forEach(ink => inkPlayer.playInk(browser, mathConfig, ink.strokes, ink.labels));
};

module.exports['Math rest multiple undo test'] = function multipleUndo(browser) {
  mathConfig.inks
      .filter(ink => ink.name === 'equation')
      .forEach(ink => inkPlayer.playInkMultipleUndos(browser, mathConfig, ink.strokes, ink.labels));
};
