const inkPlayer = require('../../lib/inkPlayerFull');
const config = require('../../../lib/configuration').getConfiguration('TEXT', 'WEBSOCKET', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' playInk ' + ink.name] = function playInk(browser) {
    inkPlayer.playInk(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };
}

config.inks
    .filter(ink => ['hello'].includes(ink.name))
    .forEach(ink => runInkTests(ink));
