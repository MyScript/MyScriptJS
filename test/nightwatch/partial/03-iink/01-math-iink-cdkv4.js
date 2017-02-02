const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V4');

function runInkTests(ink) {
  module.exports[config.header + ' checkTypeset ' + ink.name] = function playInk(browser) {
    inkPlayer.checkTypeset(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };
}

config.inks
    .filter(ink => ['system'].includes(ink.name))
    .forEach(ink => runInkTests(ink));
