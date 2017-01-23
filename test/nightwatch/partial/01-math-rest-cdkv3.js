const config = require('../../lib/configuration');
const inkPlayer = require('../lib/inkPlayer');

const timeoutAmplificator = config.timeoutAmplificator;
const mathConfig = config.mathRestSample;
const mathScratchOutConfig = config.mathScratchOutRestSample;

module.exports['Math rest very simple test'] = function (browser) {
  mathConfig.inks.forEach((ink) => {
    inkPlayer.playInk(browser, mathConfig, ink.strokes, ink.labels);
  });
};

module.exports['Math rest scratch out test'] = function (browser) {
  mathScratchOutConfig.inks.forEach((ink) => {
    inkPlayer.playInkScratchOut(browser, mathScratchOutConfig, ink.strokes, ink.labels);
  });
};
