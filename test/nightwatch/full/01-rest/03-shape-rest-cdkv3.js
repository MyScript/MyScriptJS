const inkPlayer = require('../../lib/inkPlayerFull');
const config = require('../../../lib/configuration').getConfiguration('SHAPE', 'REST', 'V3');

module.exports['Shape very simple test'] = function simple(browser) {
  config.inks
      .filter(ink => ink.name === 'shapeHello')
      .forEach(ink => inkPlayer.playInk(browser, config, ink.strokes, ink.labels, '#inkPaperSupervisor span', '#inkPaperSupervisor span'));
};

module.exports['Shape multiple undo test'] = function multipleUndo(browser) {
  config.inks
      .filter(ink => ink.name === 'shapeHello')
      .forEach(ink => inkPlayer.playInkMultipleUndos(browser, config, ink.strokes, ink.labels, '#inkPaperSupervisor span', '#inkPaperSupervisor span'));
};
