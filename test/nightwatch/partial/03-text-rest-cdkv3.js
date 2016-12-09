const config = require('../../lib/configuration');
const inkPlayer = require('../../lib/inkPlayer');

const timeoutAmplificator = config.timeoutAmplificator;
const textConfig = config.textRestSample;

module.exports['Text rest very simple test'] = function (browser) {
  textConfig.inks.forEach((ink) => {
    inkPlayer.playInk(browser, textConfig, ink.strokes, ink.labels);
  });
};

