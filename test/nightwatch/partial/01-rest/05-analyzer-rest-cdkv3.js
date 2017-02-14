const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('ANALYZER', 'REST', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' ' + ink.name + '.playInk'] = function playInk(browser) {
    inkPlayer.playInk(browser, config, ink.strokes, ink.labels, '#inkPaperSupervisor span', '#inkPaperSupervisor span');
  };
}

config.inks
    .filter(ink => ['fourSquare'].includes(ink.name))
    .forEach(ink => runInkTests(ink));
