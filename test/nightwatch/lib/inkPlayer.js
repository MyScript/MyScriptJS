/* eslint-disable no-shadow */
const globalconfig = require('./../../lib/configuration');
const common = require('./../../lib/common');

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

function checkTextNonText(browser, resultSelector) {
  if (resultSelector && resultSelector.length > 0) {
    browser.waitForElementPresent(resultSelector, 6000 * globalconfig.timeoutAmplificator);
  }
  browser.getJiixExports(function (res) {
    //console.log('export res: ' + JSON.stringify(res.value));
    const parsedjiix = JSON.parse(res.value);

    browser.verify.equal(parsedjiix.type, "Raw Content");
    browser.verify.equal(parsedjiix.elements.length > 0, true);

    var nonTextFound = false;
    var textFound = "";
    parsedjiix.elements.forEach(element => {
      if (element.type === "Raw Content" && element.kind === "non-text") {
        nonTextFound = true;
      }
      if (element.type === "Text") {
        textFound = element.label;
      }
    });
    browser.verify.equal(nonTextFound, true);
    browser.verify.equal(textFound.length > 0, true);
  });
}

function getStrokesFromJIIX(jiix) {
  var strokesList = []
  var itemsList = common.findValuesByKey(jiix, 'items');
  for (var i=0; i<itemsList.length; i++) {
    if(itemsList[i].type == "stroke") {
      strokesList.push(itemsList[i]);
    }
  }
  return strokesList;
}

function checkNbStrokes(browser, config, resultSelector, property, nbStrokesExpected) {
  const isWebSocketV4 = (config.apiVersion === 'V4' && config.protocol !== 'REST');
  if(isWebSocketV4) {
    browser.getJiixExports(function (res) {
      //console.log('export= ' + JSON.stringify(res.value));
      browser.verify.equal(getStrokesFromJIIX(res.value).length, String(nbStrokesExpected));
    })
  }
  else {
    browser.verify.attributeEquals('#editorSupervisor', 'nbstrokes', String(nbStrokesExpected));
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
      .playStrokes(component, [stroke], 100, 100, 1000 * globalconfig.timeoutAmplificator)
      //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', i + 1, 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

    checkLabel(browser, labels, i, resultSelector, emptyResultSelector);
  });
  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length);

  browser.end();
}

function checkUndoRedo(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  console.log('url ' +  browser.launchUrl + config.componentPath);
  const isWebSocketV4 = (config.apiVersion === 'V4' && config.protocol !== 'REST');
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length);
  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .click('#clear')
    .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator);
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
    .click('#undo')
    .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator);
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? 0 : strokes.length, 3000 * globalconfig.timeoutAmplificator);

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length);
  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .click('#undo')
    .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? 0 : strokes.length - 1, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length - 1);
  checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);

  if (strokes.length > 1) {
    browser
      .click('#undo')
      .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator);
      //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? 0 : strokes.length - 2, 3000 * globalconfig.timeoutAmplificator);

    checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length - 2);

    browser
      .click('#redo')
      .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator);
      //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? 0 : strokes.length - 1, 3000 * globalconfig.timeoutAmplificator);

    checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length - 1);
    checkLabel(browser, labels, strokes.length - 2, resultSelector, emptyResultSelector);
  }

  browser
    .playStrokes(component, strokes.slice(-1), 100, 100, 3000 * globalconfig.timeoutAmplificator)
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? 1 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length);
  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser
    .click('#clear')
    .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator);
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length);
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
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator)
    .verify.attributeEquals('#editorSupervisor', 'data-canundo', String(true))
    .verify.attributeEquals('#editorSupervisor', 'data-canredo', String(false))
    .verify.attributeEquals('#editorSupervisor', 'data-canclear', String(true));

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length);

  browser
    .click('#convert');

  browser.end();
}

function checkSmartGuide(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  console.log('url ' +  browser.launchUrl + config.componentPath)
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator)
    .setProperty('#smartGuideFadeOut', 'enable', false);
  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
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
  console.log('url ' +  browser.launchUrl + config.componentPath);
  const isWebSocketV4 = (config.apiVersion === 'V4' && config.protocol !== 'REST');
  //console.log('url ' +  browser.launchUrl + config.componentPath)
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  console.log('strokes nb = ' + strokes.length);
  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length);
  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  if (isWebSocketV4 && config.type === 'TEXT') {
    browser.getAttribute('.smartguide', 'id', (res) => {
      const randomString = res.value.replace('smartguide', '');
      browser
        .click(`#ellipsis${randomString}`)
        .click(`#delete${randomString}`)
        .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator);
        //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator);
    });
  } else {
    browser
      .click('#clear')
      .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator);
      //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', 0, 3000 * globalconfig.timeoutAmplificator);
  }

  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
    .click('#disconnect')
    .pause(1000) // 1 second
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator)
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? strokes.length * 2 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length);
  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  strokes.forEach((stroke, i) => { // FIXME: there is not necessarily one undo/redo state by stroke, it can be less
    browser.getAttribute('#undo', 'disabled', (result) => {
      if (result.status === 0) {
        if (result.value === true) {
          browser
            .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
            .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

          checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

        } else {
          browser
            .click('#undo')
            .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
            .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

          checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length - i - 1);
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
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length);
  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);


  browser
    .pause(310000) // 5mn 10 seconds
    .click('#clear')
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? strokes.length : 0, 3000 * globalconfig.timeoutAmplificator);

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', 0);
  checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', isWebSocketV4 ? strokes.length + strokes.length + 1 : strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

  checkNbStrokes(browser, config, resultSelector, 'nbstrokes', strokes.length);
  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);


  browser.end();
}

function checkRawContent(browser, config, strokes, component = '#editor', resultSelector = '#editorSupervisor') {
  console.log('url ' +  browser.launchUrl + config.componentPath)
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  browser
    .playStrokes(component, strokes, 100, 100, 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 1000 * globalconfig.timeoutAmplificator);

  checkTextNonText(browser, resultSelector);

  browser.end();
}

function checkRecognitionAssetBuilder(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  console.log('url ' +  browser.launchUrl + config.componentPath);
  console.log('nb strokes ' + strokes.length);
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  if(config.type === 'TEXT') {
    browser
      .waitForElementPresent('#lexicon', 1000 * globalconfig.timeoutAmplificator)
      .setProperty('#lexicon', 'value', 'covfefe')
      .click('#reinit')
  }

  browser
    .pause(2000)
    .playStrokes(component, strokes, 100, 100, 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 1000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);


  browser.end();
}

function checkImport(browser, config, strokes, labels, component = '#editor', resultSelector = '#editorSupervisor', emptyResultSelector = '#editorSupervisor') {
  console.log('url ' +  browser.launchUrl + config.componentPath);
  console.log('nb strokes ' + strokes.length);
  let jiixExport = '';
  browser
    .init(browser.launchUrl + config.componentPath).maximizeWindow()
    .waitForElementVisible(component, 1000 * globalconfig.timeoutAmplificator)
    .listenEditor()
    .waitForElementPresent('#editorSupervisor', 1000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'unloaded', false, 3000 * globalconfig.timeoutAmplificator);

  browser
    .playStrokes(component, strokes, 100, 100, 3000 * globalconfig.timeoutAmplificator)
    //.waitUntilElementPropertyEqual('#editorSupervisor', 'nbstrokes', strokes.length, 3000 * globalconfig.timeoutAmplificator)
    .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 3000 * globalconfig.timeoutAmplificator);

  checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);

  browser.getJiixExports(function (res) {
    const parsedjiix = JSON.parse(res.value);
    jiixExport = parsedjiix;

    browser
      .click('#clear')
      .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator);

    checkLabel(browser, labels, -1, resultSelector, emptyResultSelector);

    browser
      .waitForElementPresent('#importContentField', 1000 * globalconfig.timeoutAmplificator)
      .waitForElementPresent('#importContent', 1000 * globalconfig.timeoutAmplificator)
      .setProperty('#importContentField', 'value', JSON.stringify(jiixExport))
      .click("#importContent")
      .waitForIdle('#editorSupervisor', 3000 * globalconfig.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#editorSupervisor', 'state', 'EXPORTED', 2000 * globalconfig.timeoutAmplificator);

    checkLabel(browser, labels, strokes.length - 1, resultSelector, emptyResultSelector);
  });

  browser.end();
}

module.exports = {
  checkLabels,
  checkUndoRedo,
  checkConvert,
  checkSmartGuide,
  checkUndoRedoReconnect,
  checkAlwaysConnected,
  checkRawContent,
  checkRecognitionAssetBuilder,
  checkImport
};
