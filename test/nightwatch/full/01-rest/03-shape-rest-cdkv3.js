const config = require('../../../lib/configuration');
const inkPlayer = require('../../lib/inkPlayerFull');

const shapeConfig = config.shapeRestSample;

module.exports['Shape very simple test'] = function simple(browser) {
  shapeConfig.inks.forEach(ink => inkPlayer.playInk(browser, shapeConfig, ink.strokes, ink.labels, '#inkPaperSupervisor span', '#inkPaperSupervisor span'));
};

module.exports['Shape multiple undo test'] = function multipleUndo(browser) {
  shapeConfig.inks.forEach(ink => inkPlayer.playInkMultipleUndos(browser, shapeConfig, ink.strokes, ink.labels, '#inkPaperSupervisor span', '#inkPaperSupervisor span'));
};
