const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('SHAPE', 'REST', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' ' + ink.name + '.playInk'] = function playInk(browser) {
    inkPlayer.playInk(browser, config, ink.strokes, ink.labels);
  };

  module.exports[config.header + ' ' + ink.name + '.playInkMultipleUndos'] = function playInkMultipleUndos(browser) {
    inkPlayer.playInkMultipleUndos(browser, config, ink.strokes, ink.labels);
  };
}

config.inks
    .filter(ink => ['shapeHello'].includes(ink.name))
    .forEach(ink => runInkTests(ink));
