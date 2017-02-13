const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('SHAPE', 'REST', 'V3');

module.exports[config.header + ' very simple test'] = function simple(browser) {
  config.inks
      .filter(ink => ink.name === 'shapeHello')
      .forEach(ink => inkPlayer.playInk(browser, config, ink.strokes, ink.labels, '#inkPaperSupervisor span', '#inkPaperSupervisor span'));
};

module.exports[config.header + ' multiple undo test'] = function multipleUndo(browser) {
  config.inks
      .filter(ink => ink.name === 'shapeHello')
      .forEach(ink => inkPlayer.playInkMultipleUndos(browser, config, ink.strokes, ink.labels, '#inkPaperSupervisor span', '#inkPaperSupervisor span'));
};
