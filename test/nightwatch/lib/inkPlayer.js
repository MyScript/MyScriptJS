const globalconfig = require('./../../lib/configuration');

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
      .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(strokes.length));

  if (labels[strokes.length - 1] === '') {
    browser.verify.containsText(emptyResultSelector, labels[strokes.length - 1], 'Label is the one expected');
  } else {
    browser.verify.containsText(resultSelector, labels[strokes.length - 1], 'Label is the one expected');
  }

  browser
      .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(strokes.length-1));

  if (labels[strokes.length - 2] === '') {
    browser.verify.containsText(emptyResultSelector, labels[strokes.length - 2], 'undo have the expected result')
  } else {
    browser.verify.containsText(resultSelector, labels[strokes.length - 2], 'Undo have the expected behavior')
  }

  browser
      .click('#redo')
      .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(strokes.length));

  if (labels[strokes.length - 1] === '') {
    browser.verify.containsText(emptyResultSelector, labels[strokes.length - 1], 'redo have the expected result');
  } else {
    browser.verify.containsText(resultSelector, labels[strokes.length - 1], 'redo have the expected result');
  }

  browser
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(strokes.length-1));

  if (labels[strokes.length - 2] === '') {
    browser.verify.containsText(emptyResultSelector, labels[strokes.length - 2], 'undo have the expected result')
  } else {
    browser.verify.containsText(resultSelector, labels[strokes.length - 2], 'Undo have the expected behavior')
  }

  browser
      .playStrokes('#inkPaper', lastStroke, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(strokes.length));

  if (labels[strokes.length - 1] === '') {
    browser.verify.containsText(emptyResultSelector, labels[strokes.length - 1], 'Label is the one expected');
  } else {
    browser.verify.containsText(resultSelector, labels[strokes.length - 1], 'Label is the one expected');
  }

  browser
      .click('#clear')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.containsText(emptyResultSelector, '', 'Clear have the expected result')
      .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(0))
      .end();
}

function playInkClearUndo(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  const lastStroke = strokes.slice(-1);
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.containsText(resultSelector, labels[0], 'Label is the one expected')
      .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(strokes.length))

      .waitForElementVisible('#clear', 1000 * globalconfig.timeoutAmplificator)
      .click('#clear')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.containsText(emptyResultSelector, labels[1], 'Clear have the expected result')
      .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(0))

      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.containsText(resultSelector, labels[2], 'Label is the one expected')
      .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(strokes.length))

      .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length -1, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .verify.containsText(emptyResultSelector, labels[3], 'undo have the expected result')
      .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(strokes.length -1))
      .end();
}

function playInkMultipleUndoRedos(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  const lastStroke = strokes.slice(-1);
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .verify.containsText(resultSelector, labels[strokes.length - 1], 'Label is the one expected');

  for(let i=1; i<=strokes.length; i++) {
    browser
        .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
        .click('#undo')
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - i, 3000 * globalconfig.timeoutAmplificator)
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);
    if(i===strokes.length) {
        browser.verify.containsText(emptyResultSelector, '', 'last undo has the expected result')
    } else {
        browser.verify.containsText(resultSelector, labels[strokes.length - 1 - i], 'Label is the one expected')
    }
    browser.verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(strokes.length - i));
  };
  for(let j=0; j<strokes.length; j++) {
    browser
        .waitForElementVisible('#redo', 1000 * globalconfig.timeoutAmplificator)
        .click('#redo')
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', j + 1, 3000 * globalconfig.timeoutAmplificator)
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
        .verify.containsText(resultSelector, labels[j], 'Label is the one expected')
        .verify.attributeEquals('#inkPaperSupervisor', 'data-' + 'nbstrokes', String(j+1));
  };
  browser.end();
}

module.exports = {
  playInk,
  playInkClearUndo,
  playInkMultipleUndoRedos
};
