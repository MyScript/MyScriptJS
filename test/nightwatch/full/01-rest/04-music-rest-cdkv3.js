const inkPlayer = require('../../lib/inkPlayerFull');
const config = require('../../../lib/configuration').getConfiguration('MUSIC', 'REST', 'V3');

module.exports['Music very simple test'] = function simple(browser) {
  config.inks
      .filter(ink => ink.name === 'music')
      .forEach(ink => inkPlayer.playInk(browser, config, ink.strokes, ink.labels, '#result', '#result'));
};
