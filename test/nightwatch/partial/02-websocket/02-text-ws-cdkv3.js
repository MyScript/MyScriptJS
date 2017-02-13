const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('TEXT', 'WEBSOCKET', 'V3');

module.exports[config.header + ' very simple test'] = function simple(browser) {
  config.inks
      .filter(ink => ink.name === 'hello')
      .forEach(ink => inkPlayer.playInk(browser, config, ink.strokes, ink.labels));
};
