const globalconfig = require('./../../lib/configuration');

function checkLabel(browser, labels, index, resultSelector, emptyResultSelector) {
  if (index < 0) {
    browser.verify.containsText(emptyResultSelector, '', 'Canvas is correctly empty');
  } else if (labels[index] === '') {
    browser.verify.containsText(emptyResultSelector, labels[index], 'Label is the one expected: ' + labels[index]);
  } else {
    browser.verify.containsText(resultSelector, labels[index], 'Label is the one expected: ' + labels[index]);
  }
}

function playInk(browser, config, strokes, labels, resultSelector = '#editorSupervisor span', emptyResultSelector = '#editorSupervisor span') {
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#editor', 1000 * globalconfig.timeoutAmplificator)
      .listenEditor()
      .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator);

  strokes.forEach((stroke, i) => {
    browser
        .playStrokes('#editor', [stroke], 100, 100)
        .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', i + 1, 3000 * globalconfig.timeoutAmplificator)
        .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
        .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(i + 1));

    checkLabel(browser, labels, i, resultSelector, emptyResultSelector);
  });

  browser.end();
}

function checkUndoRedo(browser, config, strokes, labels, resultSelector = '#editorSupervisor span', emptyResultSelector = '#editorSupervisor span') {
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#editor', 1000 * globalconfig.timeoutAmplificator)
      .listenEditor()
      .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator);

  browser
      .playStrokes('#editor', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
      .click('#clear')
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length : 0));

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
      .click('#undo')
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);


  browser
      .click('#undo')
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length : strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length : strokes.length - 1));

  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  if (strokes.length > 1) {
    browser
        .click('#undo')
        .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length : strokes.length - 2, 3000 * globalconfig.timeoutAmplificator)
        .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length : strokes.length - 2));

    browser
        .click('#redo')
        .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length : strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
        .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length : strokes.length - 1));

    checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);
  }

  browser
      .playStrokes('#editor', strokes.slice(-1), 100, 100)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length + 1 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length + 1 : strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
      .click('#clear')
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length + 1 : 0, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length + 1 : 0));

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
      .playStrokes('#editor', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length + strokes.length + 1 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length + strokes.length + 1 : strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser.end();
}

function checkConvert(browser, config, strokes, labels, resultSelector = '#editorSupervisor span', emptyResultSelector = '#editorSupervisor span') {
  browser
      .init(browser.launchUrl + config.componentPath)
      .waitForElementVisible('#editor', 1000 * globalconfig.timeoutAmplificator)
      .listenEditor()
      .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator);

  browser
      .playStrokes('#editor', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(strokes.length))
      .verify.attributeEquals('#editorSupervisor', 'data-canundo', String(true))
      .verify.attributeEquals('#editorSupervisor', 'data-canredo', String(false))
      .verify.attributeEquals('#editorSupervisor', 'data-canclear', String(true));

  browser
      .click('#convert');

  browser.end();
}

module.exports = {
  playInk,
  checkUndoRedo,
  checkConvert
};
