const config = require('../../../lib/configuration');
const inkPlayer = require('../../../lib/inkPlayer');

const mathConfig = config.mathWSSample;


module.exports['Math very simple test'] = function (browser) {
  mathConfig.inks.forEach((ink) => {
    inkPlayer.playInk(browser, mathConfig, ink.strokes, ink.label);
  });
};

