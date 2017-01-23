const config = require('../../lib/configuration');
const inkPlayer = require('../lib/inkPlayer');

const mathConfig = config.mathWSSample;
const mathScratchOutConfig = config.mathScratchOutWSSample;


module.exports['Math websocket very simple test'] = function (browser) {
  mathConfig.inks.forEach((ink) => {
    inkPlayer.playInk(browser, mathConfig, ink.strokes, ink.labels);
  });
};

module.exports['Math websocket scratch out test'] = function (browser) {
  mathScratchOutConfig.inks.forEach((ink) => {
    inkPlayer.playInkScratchOut(browser, mathScratchOutConfig, ink.strokes, ink.labels);
  });
};
