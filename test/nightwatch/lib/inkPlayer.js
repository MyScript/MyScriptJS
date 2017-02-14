const globalconfig = require('./../../lib/configuration');

// function checkLabel(browser, labels, index, resultSelector, emptyResultSelector) {
//   if (index < 0) {
//     browser.getText(emptyResultSelector, function (text) {
//       this.verify.equal(text.value, '');
//     });
//   } else if (labels[index] === '') {
//     browser.getText(emptyResultSelector, function (text) {
//       this.verify.equal(text.value, labels[index]);
//     });
//   } else {
//     browser.getText(resultSelector, function (text) {
//       this.verify.equal(text.value, labels[index]);
//     });
//   }
// }

function checkLabel(browser, labels, index, resultSelector, emptyResultSelector) {
  if (index < 0) {
    browser.verify.containsText(emptyResultSelector, '', 'Canvas is correctly empty');
  } else if (labels[index] === '') {
    browser.verify.containsText(emptyResultSelector, labels[index], 'Label is the one expected: ' + labels[index]);
  } else {
    browser.verify.containsText(resultSelector, labels[index], 'Label is the one expected: ' + labels[index]);
  }
}

function playInk(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator);

  browser
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length - 1));

  browser
      .click('#redo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length));

  browser
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length - 1));

  browser
      .playStrokes('#inkPaper', strokes.slice(-1), 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
      .click('#clear')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
      .verify.containsText(emptyResultSelector, '', 'Clear have the expected result')
      .end();
}

function playInkClearUndo(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator);

  browser
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
      .click('#clear')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(0));

  browser
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length));

  browser
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length - 1));

  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  browser
      .playStrokes('#inkPaper', strokes.slice(-1), 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length - 1));

  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  browser.end();
}

function playInkMultipleUndos(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator);

  browser
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  for (let i = 1; i <= strokes.length; i++) {
    browser
        .click('#undo')
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - i, 3000 * globalconfig.timeoutAmplificator)
        .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(strokes.length - i));
  }
  for (let j = 0; j < strokes.length; j++) {
    browser
        .click('#redo')
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', j + 1, 3000 * globalconfig.timeoutAmplificator)
        .verify.attributeEquals('#inkPaperSupervisor', 'data-rawstrokes', String(j + 1));
  }
  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser.end();
}

module.exports = {
  playInk,
  playInkClearUndo,
  playInkMultipleUndos
};
