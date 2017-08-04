const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MUSIC', 'REST', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
    inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.exports.MUSICXML, '#editor', '[data-key=MUSICXML]');
  };
}

config.inks
  .filter(ink => ['music'].includes(ink.name))
  .forEach(ink => runInkTests(ink));
