const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('TEXT', 'WEBSOCKET', 'V4', '', 'RAB');

function runRecognitionAssetBuilderTest(ink) {
  module.exports[config.header + ' CheckRecognitionAssetBuilder ' + ink.name] = function CheckRecognitionAssetBuilder(browser) {
    inkPlayer.checkRecognitionAssetBuilder(browser, config, ink.strokes, ink.exports.TEXT, '#editor', '[data-key="text/plain"]');
  };
}

config.inks
  .filter(ink => ['rabText'].includes(ink.name))
  .forEach(ink => runRecognitionAssetBuilderTest(ink))
