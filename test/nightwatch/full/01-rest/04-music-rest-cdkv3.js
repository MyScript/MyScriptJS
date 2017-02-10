const config = require('../../../lib/configuration');
const inkPlayer = require('../../lib/inkPlayerFull');

const musicConfig = config.getConfiguration('MUSIC', 'REST');

module.exports['Music very simple test'] = function simple(browser) {
  musicConfig.inks
      .filter(ink => ink.name === 'music')
      .forEach(ink => inkPlayer.playInk(browser, musicConfig, ink.strokes, ink.labels, '#result', '#result'));
};
