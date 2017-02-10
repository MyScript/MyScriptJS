const config = require('../../../lib/configuration');
const inkPlayer = require('../../lib/inkPlayerFull');

const musicConfig = config.musicRestSample;

module.exports['Music very simple test'] = function simple(browser) {
  musicConfig.inks.forEach(ink => inkPlayer.playInk(browser, musicConfig, ink.strokes, ink.labels, '#result', '#result'));
};

