const globalconfig = require('./../../lib/configuration');

function playInk(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
  const lastStroke = strokes.slice(-1);
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
      .listenInkPaper()
      .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator);

  if(labels[strokes.length - 1] === '') {
      browser.verify.containsText(emptyResultSelector, labels[strokes.length - 1], 'Label is the one expected');
  } else{
      browser.verify.containsText(resultSelector, labels[strokes.length - 1], 'Label is the one expected');
  }

  browser
      .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
      .click('#undo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1, 10000 * globalconfig.timeoutAmplificator)
      .verify.containsText(resultSelector, labels[strokes.length - 2], 'Undo have the expected behavior')
      .click('#redo')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator);

  if(labels[strokes.length - 1] === '') {
     browser.verify.containsText(emptyResultSelector, labels[strokes.length - 1], 'redo have the expected result');
  } else{
     browser.verify.containsText(resultSelector, labels[strokes.length - 1], 'redo have the expected result');
  }

  browser
      .click('#undo')
      .playStrokes('#inkPaper', lastStroke, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator);

  if(labels[strokes.length - 1] === '') {
     browser.verify.containsText(emptyResultSelector, labels[strokes.length - 1], 'Label is the one expected');
  } else{
     browser.verify.containsText(resultSelector, labels[strokes.length - 1], 'Label is the one expected');
  }

  browser
      .click('#clear')
      .verify.containsText(emptyResultSelector, '', 'Clear have the expected result')
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
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator)
        .verify.containsText(resultSelector, labels[0], 'Label is the one expected')

        .waitForElementVisible('#clear', 1000 * globalconfig.timeoutAmplificator)
        .click('#clear')
        .verify.containsText(emptyResultSelector, labels[1], 'Clear have the expected result')

        .playStrokes('#inkPaper', strokes, 100, 100)
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator)
        .waitForElementPresent(resultSelector, 3000 * globalconfig.timeoutAmplificator)
        .verify.containsText(resultSelector, labels[2], 'Label is the one expected')

        .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
        .click('#undo')
        .verify.containsText(emptyResultSelector, labels[3], 'undo have the expected result')
        .end();
}

function playInkMultipleUndos(browser, config, strokes, labels, resultSelector = '#result span', emptyResultSelector = '#result') {
    const lastStroke = strokes.slice(-1);
    browser
        .init(browser.launchUrl + config.componentPath)
        .waitForElementVisible('#inkPaper', 1000 * globalconfig.timeoutAmplificator)
        .listenInkPaper()
        .waitForElementPresent('#inkPaperSupervisor', 1000 * globalconfig.timeoutAmplificator)
        .playStrokes('#inkPaper', strokes, 100, 100)
        .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 10000 * globalconfig.timeoutAmplificator)
        .verify.containsText(resultSelector, labels[strokes.length - 1], 'Label is the one expected');

    for(let i=0; i<strokes.length; i++) {
        browser
            .waitForElementVisible('#undo', 1000 * globalconfig.timeoutAmplificator)
            .click('#undo')
            .waitForElementPresent(resultSelector, 3000 * globalconfig.timeoutAmplificator)
            .verify.containsText(resultSelector, labels[strokes.length - 1 - i], 'Label is the one expected')
            .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length - 1 - i, 3000 * globalconfig.timeoutAmplificator)
            .getProperty('#inkPaperSupervisor', 'nbstrokes', function(nbStrokes) {
                browser.verify.equal(nbStrokes.value, strokes.length - 1 - i);
            });
    };
    browser.end();
}

module.exports = {
  playInk,
  playInkClearUndo,
  playInkMultipleUndos
};
