const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' checkLabels ' + ink.name] = function checkLabels(browser) {
    inkPlayer.checkLabels(browser, config, ink.strokes, ink.exports.LATEX, '#result span', '#result');
  };

  module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
    inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.exports.LATEX, '#result span', '#result');
  };
}

config.inks
  .filter(ink => ['equation2'].includes(ink.name))
  .forEach(ink => runInkTests(ink));
