const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'REST', 'V3');

module.exports[config.header + ' very simple test'] = function simple(browser) {
  config.inks
      .filter(ink => ink.name === 'equation')
      .forEach(ink => inkPlayer.playInk(browser, config, ink.strokes, ink.labels));
};

module.exports[config.header + ' clear undo test'] = function clearUndo(browser) {
  config.inks
      .filter(ink => ink.name === 'one')
      .forEach(ink => inkPlayer.playInkClearUndo(browser, config, ink.strokes, ink.labels));
};

module.exports[config.header + ' scratch out test'] = function scratchOut(browser) {
  config.inks
      .filter(ink => ink.name === 'equation2')
      .forEach(ink => inkPlayer.playInk(browser, config, ink.strokes, ink.labels));
};

module.exports[config.header + ' multiple undo test'] = function multipleUndo(browser) {
  config.inks
      .filter(ink => ink.name === 'equation')
      .forEach(ink => inkPlayer.playInkMultipleUndos(browser, config, ink.strokes, ink.labels));
};
