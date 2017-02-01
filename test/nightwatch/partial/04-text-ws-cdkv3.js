const config = require('../../lib/configuration');
const inkPlayer = require('../lib/inkPlayer');

const textConfig = config.textWSSample;

module.exports['Text ws very simple test'] = function (browser) {
  textConfig.inks.forEach(ink => inkPlayer.playInk(browser, textConfig, ink.strokes, ink.labels));
};

