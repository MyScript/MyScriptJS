const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('TEXT', 'WEBSOCKET', 'V4');

function runInkTests(ink) {
  // module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
  //   inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.exports.TEXT, '#editor', '[data-key="text/plain"]');
  // };

  // module.exports[config.header + ' checkConvert ' + ink.name] = function checkConvert(browser) {
  //   inkPlayer.checkConvert(browser, config, ink.strokes, ink.exports.TEXT, '#editor', '[data-key="text/plain"]');
  // };

  module.exports[config.header + ' checkUndoRedoReconnect ' + ink.name] = function checkUndoRedoReconnect(browser) {
    inkPlayer.checkUndoRedoReconnect(browser, config, ink.strokes, ink.exports.TEXT, '#editor', '[data-key="text/plain"]');
  };
  module.exports[config.header + ' checkSmartGuide ' + ink.name] = function checkSmartGuide(browser) {
    inkPlayer.checkSmartGuide(browser, config, ink.strokes, ink.exports.TEXT, '#editor', '[data-key="text/plain"]');
  };
}

config.inks
  .filter(ink => ['hello', 'helloHow'].includes(ink.name))
  .forEach(ink => runInkTests(ink));
