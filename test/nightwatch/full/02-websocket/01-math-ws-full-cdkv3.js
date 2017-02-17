const inkPlayer = require('../../lib/inkPlayerFull');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' playInk ' + ink.name] = function playInk(browser) {
    inkPlayer.playInk(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };

  module.exports[config.header + ' playInkClearUndo ' + ink.name] = function playInkClearUndo(browser) {
    inkPlayer.playInkClearUndo(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };

  module.exports[config.header + ' playInkMultipleUndos ' + ink.name] = function playInkMultipleUndos(browser) {
    inkPlayer.playInkMultipleUndos(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };
}

config.inks
    .filter(ink => ['one', 'equation', 'equation2'].includes(ink.name))
    .forEach(ink => runInkTests(ink));
