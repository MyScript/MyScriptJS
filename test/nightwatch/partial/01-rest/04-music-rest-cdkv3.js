const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MUSIC', 'REST', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' playInk ' + ink.name] = function playInk(browser) {
    inkPlayer.playInk(browser, config, ink.strokes, ink.labels, '#result', '#result');
  };
}

config.inks
    .filter(ink => ['music'].includes(ink.name))
    .forEach(ink => runInkTests(ink));
