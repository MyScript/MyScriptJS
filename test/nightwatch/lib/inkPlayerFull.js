const globalconfig = require('./../../lib/configuration');

function checkLabel(browser, labels, index, resultSelector, emptyResultSelector) {
  if (index < 0) {
    browser.verify.containsText(emptyResultSelector, '', 'Canvas is correctly empty');
  } else if (labels[index] === '') {
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
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length))
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .verify.attributeEquals('#inkPaperSupervisor', 'data-canundo', String(true))
    .click('#undo')
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length - 1))
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  browser
    .verify.attributeEquals('#inkPaperSupervisor', 'data-canredo', String(true))
    .click('#redo')
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length))
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .verify.attributeEquals('#inkPaperSupervisor', 'data-canundo', String(true))
    .click('#undo')
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length - 1))
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  browser
    .playStrokes('#inkPaper', lastStroke, 100, 100)
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length))
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .verify.attributeEquals('#inkPaperSupervisor', 'data-canclear', String(true))
    .click('#clear')
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(0));

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);
  browser.end();
}

function playInkClearUndo(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  browser
    .init(browser.launchUrl + config.componentPath)
    .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
    .listenInkPaper()
    .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .playStrokes('#inkPaper', strokes, 100, 100)
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length))
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .verify.attributeEquals('#inkPaperSupervisor', 'data-canclear', String(true))
    .click('#clear')
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(0));

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
    .playStrokes('#inkPaper', strokes, 100, 100)
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length))
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .verify.attributeEquals('#inkPaperSupervisor', 'data-canundo', String(true))
    .click('#undo')
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length - 1))
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  browser.end();
}

function playInkMultipleUndos(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  browser
    .init(browser.launchUrl + config.componentPath)
    .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
    .listenInkPaper()
    .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .playStrokes('#inkPaper', strokes, 100, 100)
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length))
    .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  for (let i = 1; i <= strokes.length; i++) {
    browser
      .verify.attributeEquals('#inkPaperSupervisor', 'data-canundo', String(true))
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - i, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length - i))
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

    checkLabel(browser, labels, strokes.length - i - 1, resultSelector, emptyResultSelector);
  }
  for (let j = 0; j < strokes.length; j++) {
    browser
      .click('#redo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', j + 1, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(j + 1))
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

    checkLabel(browser, labels, j, resultSelector, emptyResultSelector);
  }
  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser.end();
}

module.exports = {
  playInk,
  playInkClearUndo,
  playInkMultipleUndos
};
