const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('TEXT', 'WEBSOCKET', 'V4');

function runInkTests(ink) {
  module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
    inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };

  // module.exports[config.header + ' checkConvert ' + ink.name] = function checkConvert(browser) {
  //   inkPlayer.checkConvert(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  // };
}

function runReconnectTests(ink) {
  module.exports[config.header + ' checkUndoRedoReconnect ' + ink.name] = function checkUndoRedoReconnect(browser) {
    inkPlayer.checkUndoRedoReconnect(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };
}


config.inks
    .filter(ink => ['hello'].includes(ink.name))
    .forEach(ink => runInkTests(ink));

config.inks
    .filter(ink => ['hello'].includes(ink.name))
    .forEach(ink => runReconnectTests(ink));

config.inks
  .filter(ink => ['helloHow'].includes(ink.name))
  .forEach(ink => runInkTests(ink));

config.inks
  .filter(ink => ['helloHow'].includes(ink.name))
  .forEach(ink => runReconnectTests(ink));
