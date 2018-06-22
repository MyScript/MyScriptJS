const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V4');

function runInkTests(ink) {
  module.exports[config.header + ' checkAlwaysConnected ' + ink.name] = function checkLabels(browser) {
    inkPlayer.checkAlwaysConnected(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  }
}

config.inks
  .filter(ink => ['equation3'].includes(ink.name))
  .forEach(ink => runInkTests(ink));
