const inkPlayer = require('../../lib/inkPlayerFull');
const config = require('../../../lib/configuration').getConfiguration('TEXT', 'REST', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' ' + ink.name + '.playInk'] = function playInk(browser) {
    inkPlayer.playInk(browser, config, ink.strokes, ink.labels);
  };
}

config.inks
    .filter(ink => ['hello'].includes(ink.name))
    .forEach(ink => runInkTests(ink));
