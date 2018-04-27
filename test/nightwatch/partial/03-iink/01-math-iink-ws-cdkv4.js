const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V4');

function runLabelTests(ink) {
  // module.exports[config.header + ' checkConvert ' + ink.name] = function checkConvert(browser) {
  //   inkPlayer.checkConvert(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  // };
  module.exports[config.header + ' checkLabels ' + ink.name] = function checkLabels(browser) {
    inkPlayer.checkLabels(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  };
}

function runUndoTests(ink) {
  module.exports[config.header + ' checkUndoRedoReconnect ' + ink.name] = function checkUndoRedoReconnect(browser) {
    inkPlayer.checkUndoRedoReconnect(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  };
  module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
    inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  };
}

config.inks
  .filter(ink => ['equation2'].includes(ink.name))
  .forEach(ink => runLabelTests(ink));

config.inks
  .filter(ink => ['one', 'equation3'].includes(ink.name))
  .forEach(ink => runUndoTests(ink));

