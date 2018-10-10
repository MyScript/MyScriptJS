const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V4', '', 'RAB');

function runRecognitionAssetBuilderTest(ink) {
  module.exports[config.header + ' CheckRecognitionAssetBuilder ' + ink.name] = function CheckRecognitionAssetBuilder(browser) {
    inkPlayer.checkRecognitionAssetBuilder(browser, config, ink.strokes, ink.exports.LATEX, '#editor', '[data-key="application/x-latex"]');
  };
}

config.inks
  .filter(ink => ['3times2'].includes(ink.name))
  .forEach(ink => runRecognitionAssetBuilderTest(ink))
