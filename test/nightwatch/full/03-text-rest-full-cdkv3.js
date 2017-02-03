const config = require('../../lib/configuration');
const inkPlayer = require('../lib/inkPlayerFull');

const timeoutAmplificator = config.timeoutAmplificator;
const textConfig = config.textRestSample;

module.exports['Text rest very simple test'] = function simple(browser) {
  textConfig.inks.forEach(ink => inkPlayer.playInk(browser, textConfig, ink.strokes, ink.labels));
};

