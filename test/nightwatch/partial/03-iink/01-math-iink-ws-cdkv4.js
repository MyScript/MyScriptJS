const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V4');
const configImport = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V4', '', 'Import');

function runLabelTests(ink) {
  module.exports[config.header + ' checkConvert ' + ink.name] = function checkConvert(browser) {
    inkPlayer.checkConvert(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  };
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

function runImportTests(ink) {
  module.exports[configImport.header + ' runImportTests ' + ink.name] = function checkImport(browser) {
    inkPlayer.checkImport(browser, configImport, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  };
}


config.inks
  .filter(ink => ['equation3'].includes(ink.name))
  .forEach(ink => runLabelTests(ink));

config.inks
  .filter(ink => ['equation3'].includes(ink.name))
  .forEach(ink => runUndoTests(ink));


configImport.inks
 .filter(ink => ['one'].includes(ink.name))
 .forEach(ink => runImportTests(ink));
