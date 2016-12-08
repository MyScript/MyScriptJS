const config = require('../../../lib/configuration');
const inkPlayer = require('../../../lib/inkPlayer');

const timeoutAmplificator = config.timeoutAmplificator;
const textConfig = config.textRestSample;

const number2 = [[[669, 666, 665, 665, 668, 672, 676, 680, 684, 687, 689, 689, 690, 690, 688, 686, 684, 681, 678, 675, 670, 667, 664, 661, 658, 655, 654, 657, 661, 664, 668, 672, 677, 682, 689, 700, 712, 720, 723, 720], [81, 80, 77, 74, 75, 76, 77, 79, 81, 84, 87, 90, 93, 97, 102, 105, 109, 112, 114, 118, 121, 123, 125, 127, 130, 133, 136, 137, 138, 138, 138, 138, 138, 137, 136, 136, 135, 133, 133, 132]]];

module.exports['Text very simple test'] = function (browser) {
  textConfig.inks.forEach((ink) => {
    inkPlayer.playInk(browser, textConfig, ink.strokes, ink.label);
  });
};

