const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' checkLabels ' + ink.name] = function checkLabels(browser) {
    inkPlayer.checkLabels(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };

  module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
    inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };
}

config.inks
    .forEach(ink => runInkTests(ink));
