const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('TEXT', 'REST', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' checkLabels ' + ink.name] = function checkLabels(browser) {
    inkPlayer.checkLabels(browser, config, ink.strokes, ink.exports.TEXT, '#editor', '[data-key=TEXT]');
  };

  module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
    inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.exports.TEXT, '#editor', '[data-key=TEXT]');
  };
}

config.inks
  .filter(ink => ['hello'].includes(ink.name))
  .forEach(ink => runInkTests(ink));
