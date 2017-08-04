const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V4');

function runInkTests(ink) {
  // module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
  //   inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  // };

  // module.exports[config.header + ' checkConvert ' + ink.name] = function checkConvert(browser) {
  //   inkPlayer.checkConvert(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  // };

  module.exports[config.header + ' checkUndoRedoReconnect ' + ink.name] = function checkUndoRedoReconnect(browser) {
    inkPlayer.checkUndoRedoReconnect(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  };
}

config.inks
  .filter(ink => ['equation'].includes(ink.name))
  .forEach(ink => runInkTests(ink));
