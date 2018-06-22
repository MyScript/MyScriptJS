const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('RAW-CONTENT', 'REST', 'V4');

function runInkTests(ink) {
  module.exports[config.header + ' checkRawContent ' + ink.name] = function checkRawContent(browser) {
    inkPlayer.checkRawContent(browser, config, ink.strokes, '#editor', '[data-key="application/vnd.myscript.jiix"]');
  };
};

config.inks
  .forEach(ink => runInkTests(ink));
