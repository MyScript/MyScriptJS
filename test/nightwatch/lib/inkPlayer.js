/* eslint-disable no-shadow */
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
      .playStrokes(component, [stroke], 100, 100, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', i + 1, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(i + 1));

    checkLabel(browser, labels, i, resultSelector, emptyResultSelector);
  });

  browser.end();
}

function checkUndoRedo(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  const isWebSocketV4 = (config.apiVersion === 'V4' && config.protocol !== 'REST');
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .click('#clear')
    .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(0));

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
    .click('#undo')
    .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? 0 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(isWebSocketV4 ? 0 : strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .click('#undo')
    .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? 0 : strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(isWebSocketV4 ? 0 : strokes.length - 1));

  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  if (strokes.length > 1) {
    browser
      .click('#undo')
      .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? 0 : strokes.length - 2, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(isWebSocketV4 ? 0 : strokes.length - 2));

    browser
      .click('#redo')
      .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? 0 : strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(isWebSocketV4 ? 0 : strokes.length - 1));

    checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);
  }

  browser
    .playStrokes(component, strokes.slice(-1), 100, 100, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? 1 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(isWebSocketV4 ? 1 : strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .click('#clear')
    .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(0));

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(strokes.length));

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
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(strokes.length))
    .verify.attributeEquals('#editorSupervisor', 'data-canundo', String(true))
    .verify.attributeEquals('#editorSupervisor', 'data-canredo', String(false))
    .verify.attributeEquals('#editorSupervisor', 'data-canclear', String(true));

  browser
    .click('#convert');

  browser.end();
}

function checkSmartGuide(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator)
    .setProperty('#smartGuideFadeOut', 'enable', false);
  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .waitForElementVisible('.smartguide', 1000 * globalconfig.timeoutAmplificator);

  browser.getAttribute('.smartguide', 'id', (res) => {
    const randomString = res.value.replace('smartguide', '');
    browser
      .getProperty('.prompter-text', 'textContent', (res) => {
        const labelsWithNbsp = labels[strokes.length - 1].replace(/\s/g, '\u00A0');
        browser.verify.equal(res.value.toString() === labelsWithNbsp.toString(), true);
      })
      .click(`#ellipsis${randomString}`)
      .click(`#convert${randomString}`)
      .pause(1000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
      .getProperty('.prompter-text', 'textContent', (res) => {
        const labelsWithNbsp = labels[strokes.length - 1].replace(/\s/g, '\u00A0');
        browser.verify.equal(res.value.toString() === labelsWithNbsp.toString(), true);
        const words = labelsWithNbsp.toString().split('\u00A0');
        // a random word in the smartGuide
        const wordIdx = Math.floor(Math.random() * words.length);
        browser
          .click('#word-' + (wordIdx * 2) + randomString)
          .waitForElementVisible(`#candidates${randomString}`, 1000 * globalconfig.timeoutAmplificator)
          // eslint-disable-next-line no-loop-func
          .getNumberOfSpans(`#candidates${randomString}`, (nbCand) => {
            // a random candidate in the smartGuide
            const candIdx = Math.floor(Math.random() * nbCand.value);
            browser.getProperty('#cdt-' + candIdx + randomString, 'textContent', (cand) => {
              browser
                .click('#cdt-' + candIdx + randomString)
                .pause(1000 * globalconfig.timeoutAmplificator)
                .getProperty('.prompter-text', 'textContent', (textModified) => {
                  browser.verify.equal(textModified.value.indexOf(cand.value.toString()) !== -1, true);
                });
            });
          });
      })
      .end();
  });
}

function checkUndoRedoReconnect(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  const isWebSocketV4 = (config.apiVersion === 'V4' && config.protocol !== 'REST');
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  if (isWebSocketV4 && config.type === 'TEXT') {
    browser.getAttribute('.smartguide', 'id', (res) => {
      const randomString = res.value.replace('smartguide', '');
      browser
        .click(`#ellipsis${randomString}`)
        .click(`#delete${randomString}`)
        .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
        .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
        .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(0));
    });
  } else {
    browser
      .click('#clear')
      .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator)
      .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(0));
  }


  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
    .click('#disconnect')
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? strokes.length * 2 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  strokes.forEach((stroke, i) => { // FIXME: there is not necessarily one undo/redo state by stroke, it can be less
    browser.getAttribute('#undo', 'disabled', (result) => {
      if (result.status === 0) {
        if (result.value === true) {
          browser
            .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
            .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
            .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? strokes.length : 0, 3000 * globalconfig.timeoutAmplificator)
            .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(isWebSocketV4 ? strokes.length : 0));
        } else {
          browser
            .click('#undo')
            .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
            .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
            .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? strokes.length * 2 : strokes.length - i, 3000 * globalconfig.timeoutAmplificator)
            .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(isWebSocketV4 ? strokes.length : strokes.length - i));
        }
      }
      // checkLabel(browser, labels, strokes.length + i, resultSelector, emptyResultSelector);
    });
  });

  browser.end();
}

function checkAlwaysConnected(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  const isWebSocketV4 = (config.apiVersion === 'V4' && config.protocol !== 'REST');
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);


  browser
    .pause(310000) // 5mn 10 seconds
    .click('#clear')
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? strokes.length : 0, 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', '0');

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? strokes.length + strokes.length + 1 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(strokes.length));

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);


  browser.end();
}


module.exports = {
  checkLabels,
  checkUndoRedo,
  checkConvert,
  checkSmartGuide,
  checkUndoRedoReconnect,
  checkAlwaysConnected
};
