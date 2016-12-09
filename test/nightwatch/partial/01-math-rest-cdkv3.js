const config = require('../../lib/configuration');
const inkPlayer = require('../../lib/inkPlayer');

const timeoutAmplificator = config.timeoutAmplificator;
const mathConfig = config.mathRestSample;

module.exports['Math rest very simple test'] = function (browser) {
  mathConfig.inks.forEach((ink) => {
    inkPlayer.playInk(browser, mathConfig, ink.strokes, ink.labels);
  });
};

