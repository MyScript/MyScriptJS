const inkPlayer = require('../../lib/inkPlayerFull');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V3');

module.exports['Math rest very simple test'] = function simple(browser) {
  config.inks
      .filter(ink => ink.name === 'equation')
      .forEach(ink => inkPlayer.playInk(browser, config, ink.strokes, ink.labels));
};

module.exports['Math rest clear undo test'] = function clearUndo(browser) {
  config.inks
      .filter(ink => ink.name === 'one')
      .forEach(ink => inkPlayer.playInkClearUndo(browser, config, ink.strokes, ink.labels));
};

module.exports['Math rest scratch out test'] = function scratchOut(browser) {
  config.inks
      .filter(ink => ink.name === 'equation2')
      .forEach(ink => inkPlayer.playInk(browser, config, ink.strokes, ink.labels));
};

module.exports['Math rest multiple undo test'] = function multipleUndo(browser) {
  config.inks
      .filter(ink => ink.name === 'equation')
      .forEach(ink => inkPlayer.playInkMultipleUndos(browser, config, ink.strokes, ink.labels));
};
