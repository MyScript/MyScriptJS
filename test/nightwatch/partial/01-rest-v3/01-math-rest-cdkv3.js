const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'REST', 'V3');

function runLabelTests(ink) {
  module.exports[config.header + ' checkLabels ' + ink.name] = function checkLabels(browser) {
    inkPlayer.checkLabels(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key=LATEX]');
  };
}

function runUndoTests(ink) {
  module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
    inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key=LATEX]');
  };
}

config.inks
  .filter(ink => ['equation'].includes(ink.name))
  .forEach(ink => runLabelTests(ink));

config.inks
  .filter(ink => ['one', 'equation3'].includes(ink.name))
  .forEach(ink => runUndoTests(ink));
