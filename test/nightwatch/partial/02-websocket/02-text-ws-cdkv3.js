const config = require('../../../lib/configuration');
const inkPlayer = require('../../lib/inkPlayer');

const textConfig = config.getConfiguration('TEXT', 'WEBSOCKET');

module.exports['Text ws very simple test'] = function simple(browser) {
  textConfig.inks
      .filter(ink => ink.name === 'hello')
      .forEach(ink => inkPlayer.playInk(browser, textConfig, ink.strokes, ink.labels));
};
