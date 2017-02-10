const config = require('../../../lib/configuration');
const inkPlayer = require('../../lib/inkPlayer');

const textConfig = config.textRestSample;

module.exports['Text rest very simple test'] = function simple(browser) {
  textConfig.inks
      .filter(ink => ink.name === 'hello')
      .forEach(ink => inkPlayer.playInk(browser, textConfig, ink.strokes, ink.labels));
};
