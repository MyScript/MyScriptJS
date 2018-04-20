const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('TEXT', 'REST', 'V4');

function runInkTests(ink) {
  module.exports[config.header + ' checkLabels ' + ink.name] = function checkLabels(browser) {
    inkPlayer.checkLabels(browser, config, ink.strokes, ink.exports.TEXT, '#editor', '[data-key="text/plain"]');
  };

  module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
    inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.exports.TEXT, '#editor', '[data-key="text/plain"]');
  };
}

config.inks
  .filter(ink => ['hellov4rest'].includes(ink.name))
  .forEach(ink => runInkTests(ink));
