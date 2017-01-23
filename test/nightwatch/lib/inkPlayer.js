const globalconfig = require('./../../lib/configuration');

function playInk(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  const lastStroke = strokes.slice(-1);
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText(resultSelector, labels[strokes.length - 1], 'Label is the one expected')
      .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
      .click('#undo')
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

function playInkScratchOut(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  const lastStroke = strokes.slice(-1);
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText(emptyResultSelector, '', 'Label is the one expected')
      .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 1, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText(resultSelector, labels[strokes.length - 2], 'Undo have the expected behavior')
      .click('#redo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText(emptyResultSelector, '', 'Redo have the expected behavior')
      .click('#undo')
      .playStrokes('#inkPaper', lastStroke, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText(emptyResultSelector, '', 'Clear have the expected result')
      .click('#clear')
      .verify.containsText(emptyResultSelector, '', 'Clear have the expected result')
      .end();
}


module.exports = {
  playInk,
  playInkScratchOut
};
