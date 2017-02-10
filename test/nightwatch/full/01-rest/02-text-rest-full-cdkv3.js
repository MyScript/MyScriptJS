const config = require('../../../lib/configuration');
const inkPlayer = require('../../lib/inkPlayerFull');

const textConfig = config.getConfiguration('TEXT', 'REST');

module.exports['Text rest very simple test'] = function simple(browser) {
  textConfig.inks
      .filter(ink => ink.name === 'hello')
      .forEach(ink => inkPlayer.playInk(browser, textConfig, ink.strokes, ink.labels));
};
