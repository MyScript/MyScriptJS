const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('TEXT', 'WEBSOCKET', 'V4');

function runInkTests(ink) {
  // module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
  //   inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.exports.TEXT, '#result span', '#result');
  // };

  // module.exports[config.header + ' checkConvert ' + ink.name] = function checkConvert(browser) {
  //   inkPlayer.checkConvert(browser, config, ink.strokes, ink.exports.TEXT, '#result span', '#result');
  // };

  module.exports[config.header + ' checkUndoRedoReconnect ' + ink.name] = function checkUndoRedoReconnect(browser) {
    inkPlayer.checkUndoRedoReconnect(browser, config, ink.strokes, ink.exports.TEXT, '#result span', '#result');
  };
}

config.inks
  .filter(ink => ['hello', 'helloHow'].includes(ink.name))
  .forEach(ink => runInkTests(ink));
