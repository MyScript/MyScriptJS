const globalconfig = require('./../../lib/configuration');

function checkLabel(browser, labels, index, resultSelector, emptyResultSelector) {
  if (labels[index] === '') {
    browser.verify.containsText(emptyResultSelector, labels[index], 'Label is the one expected');
  } else {
    browser.verify.containsText(resultSelector, labels[index], 'Label is the one expected');
  }
}

function playInk(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  const lastStroke = strokes.slice(-1);
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(strokes.length - 1));

  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  browser
      .click('#redo')
      .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(strokes.length - 1));

  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  browser
      .playStrokes('#inkPaper', lastStroke, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
      .click('#clear')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(0))
      .verify.containsText(emptyResultSelector, '', 'Clear have the expected result')
      .end();
}

function playInkClearUndo(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
      .click('#clear')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(0))
      .verify.containsText(emptyResultSelector, '', 'Clear have the expected result');

  checkLabel(browser, labels, 1, resultSelector, emptyResultSelector);

  browser
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(strokes.length));

  checkLabel(browser, labels, 2, resultSelector, emptyResultSelector);

  browser
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(strokes.length - 1));

  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  browser
      .click('#clear')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(0))
      .verify.containsText(emptyResultSelector, '', 'Clear have the expected result')
      .end();
}

function playInkMultipleUndoRedos(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  for (let i = 1; i <= strokes.length; i++) {
    browser
        .click('#undo')
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - i, 3000 * globalconfig.timeoutAmplificator)
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
        .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(strokes.length - i));

    checkLabel(browser, labels, strokes.length - i - 1, resultSelector, emptyResultSelector);
  }
  for (let j = 0; j < strokes.length; j++) {
    browser
        .click('#redo')
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', j + 1, 3000 * globalconfig.timeoutAmplificator)
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
        .verify.attributeEquals('#inkPaperSupervisor', 'data-nbstrokes', String(j + 1));

    checkLabel(browser, labels, j, resultSelector, emptyResultSelector);
  }
  browser.end();
}

module.exports = {
  playInk,
  playInkClearUndo,
  playInkMultipleUndoRedos
};
