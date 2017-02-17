const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('SHAPE', 'REST', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' playInk ' + ink.name] = function playInk(browser) {
    inkPlayer.playInk(browser, config, ink.strokes, ink.labels);
  };

  module.exports[config.header + ' playInkMultipleUndos ' + ink.name] = function playInkMultipleUndos(browser) {
    inkPlayer.playInkMultipleUndos(browser, config, ink.strokes, ink.labels);
  };
}

config.inks
    .filter(ink => ['shapeHello'].includes(ink.name))
    .forEach(ink => runInkTests(ink));
