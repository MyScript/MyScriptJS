const globalconfig = require('./configuration');

function playInk(browser, config, strokes, label) {
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .verify.elementPresent('#inkPaperSupervisor')
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText('#result span', label)
      .waitForElementVisible('#clear', 1000 * globalconfig.timeoutAmplificator)
      .click('#clear')
      .end();
}


module.exports = {
  playInk
};
