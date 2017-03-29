const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('MATH', 'WEBSOCKET', 'V4');

function runInkTests(ink) {
  module.exports[config.header + ' playInk ' + ink.name] = function playInk(browser) {
    inkPlayer.playInk(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };

  module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
    inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  };

  // module.exports[config.header + ' checkConvert ' + ink.name] = function checkConvert(browser) {
  //   inkPlayer.checkConvert(browser, config, ink.strokes, ink.labels, '#result span', '#result');
  // };
}

config.inks
    .filter(ink => ['equation3'].includes(ink.name))
    .forEach(ink => runInkTests(ink));
