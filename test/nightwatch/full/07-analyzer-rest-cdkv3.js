const config = require('../../lib/configuration');
const inkPlayer = require('../lib/inkPlayerFull');

const analyzerConfig = config.analyzerRestSample;

module.exports['Analyzer very simple test'] = function simple(browser) {
  analyzerConfig.inks.forEach(ink => inkPlayer.playInk(browser, analyzerConfig, ink.strokes, ink.labels, '#inkPaperSupervisor span', '#inkPaperSupervisor span'));
};

