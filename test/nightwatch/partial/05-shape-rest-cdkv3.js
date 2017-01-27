const config = require('../../lib/configuration');
const inkPlayer = require('../lib/inkPlayer');

const shapeConfig = config.shapeRestSample;

module.exports['Shape very simple test'] = function (browser) {
  shapeConfig.inks.forEach((ink) => {
    inkPlayer.playInk(browser, shapeConfig, ink.strokes, ink.labels, '#inkPaperSupervisor span', '#inkPaperSupervisor span');
  });
};

module.exports['Shape multiple undos test'] = function (browser) {
  shapeConfig.inks.forEach((ink) => {
    inkPlayer.playInkMultipleUndoRedos(browser, shapeConfig, ink.strokes, ink.labels, '#inkPaperSupervisor span', '#inkPaperSupervisor span');
  });
};
