const globalconfig = require('./configuration');

function playInk(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  const lastStroke = strokes.slice(-1);
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .verify.elementPresent('#inkPaperSupervisor')
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText(resultSelector, labels[strokes.length - 1], 'Label is the one expected')
      .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
      .click('#undo')
      //.pause(10000)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText(resultSelector, labels[strokes.length - 2], 'Undo have the expected behavior')
      .click('#redo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText(resultSelector, labels[strokes.length - 1], 'Redo have the expected behavior')
      .click('#undo')
      .playStrokes('#inkPaper', lastStroke, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText(resultSelector, labels[strokes.length - 1], 'Writing after undo have the expected behavior')
      .click('#clear')
      .verify.containsText(emptyResultSelector, '', 'Clear have the expected result')
      .end();
}


module.exports = {
  playInk
};
