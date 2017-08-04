const globalconfig = require('./../../lib/configuration');

function checkLabel(browser, labels, index, resultSelector, emptyResultSelector) {
  if (index < 0) {
    browser.verify.containsText(emptyResultSelector, '', 'Canvas is correctly empty');
  } else if (labels[index] === '') {
    browser.verify.containsText(emptyResultSelector, labels[index], 'Label is the one expected: ' + labels[index]);
  } else {
    if (resultSelector && resultSelector.length > 0) {
      browser.waitForElementPresent(resultSelector, 6000 * globalconfig.timeoutAmplificator);
    }
    browser.verify.containsText(resultSelector, labels[index], 'Label is the one expected: ' + labels[index]);
  }
}

function checkLabels(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  strokes.forEach((stroke, i) => {
    browser
      .playStrokes(component, [stroke], 100, 100)
      .waitForIdle()
      .waitUntilElementPropertyEqual('#editorSupervisor', 'idle', true, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', i + 1, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(i + 1));

    checkLabel(browser, labels, i, resultSelector, emptyResultSelector);
  });

  browser.end();
}

function checkUndoRedo(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  browser
    .playStrokes(component, strokes, 100, 100)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .click('#clear')
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length : 0, 3000 * globalconfig.timeoutAmplificator)
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
    .playStrokes(component, strokes.slice(-1), 100, 100)
    .waitForIdle(component)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'idle', true, 3000 * globalconfig.timeoutAmplificator)
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
    .playStrokes(component, strokes, 100, 100)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length + strokes.length + 1 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length + strokes.length + 1 : strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser.end();
}

function checkConvert(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  browser
    .playStrokes(component, strokes, 100, 100)
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

function checkUndoRedoReconnect(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  browser
    .playStrokes(component, strokes, 100, 100)
    .waitForIdle(component)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'idle', true, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .click('#clear')
    .waitForIdle(component)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'idle', true, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length : 0));

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
    .click('#close')
    .playStrokes(component, strokes, 100, 100)
    .waitForIdle(component)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'idle', true, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length * 2 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(strokes.length * 2));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  strokes.forEach((stroke, i) => { // FIXME: there is not necessarily one undo/redo state by stroke, it can be less
    browser.getAttribute('#undo', 'disabled', (result) => {
      if (result.value === null) {
        browser
          .click('#undo')
          .waitForIdle(component)
          .waitUntilElementPropertyEqual('#editorSupervisor', 'idle', true, 3000 * globalconfig.timeoutAmplificator)
          .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
          .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length * 2 : strokes.length - i, 3000 * globalconfig.timeoutAmplificator)
          .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length * 2 : strokes.length - i));
      } else {
        browser
          .waitForIdle(component)
          .waitUntilElementPropertyEqual('#editorSupervisor', 'idle', true, 3000 * globalconfig.timeoutAmplificator)
          .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
          .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', config.apiVersion === 'V4' ? strokes.length : 0, 3000 * globalconfig.timeoutAmplificator)
          .verify.attributeEquals('#editorSupervisor', 'data-rawstrokes', String(config.apiVersion === 'V4' ? strokes.length * 2 : 0));
      }
      // checkLabel(browser, labels, strokes.length + i, resultSelector, emptyResultSelector);
    });
  });

  browser.end();
}


module.exports = {
  checkLabels,
  checkUndoRedo,
  checkConvert,
  checkUndoRedoReconnect
};
