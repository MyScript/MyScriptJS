exports.command = function waitUntilPlayInkThenClear(config, start, strokes, labels, timeout, callback) {
  const browser = this;

  function checkLabel(index, resultSelector, emptyResultSelector) {
    if (index < 0) {
      browser.verify.containsText(emptyResultSelector, '', 'Canvas is correctly empty');
    } else if (labels[index] === '') {
      browser.verify.containsText(emptyResultSelector, labels[index], 'Label is the one expected: ' + labels[index]);
    } else {
      browser.verify.containsText(resultSelector, labels[index], 'Label is the one expected: ' + labels[index]);
    }
  }

  function playInkThenClear(done) {
    const resultSelector = '#result span';
    const emptyResultSelector = '#result';

    browser
      .playStrokes('#inkPaper', strokes, 100, 100)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', strokes.length, 3000 * config.timeoutAmplificator)
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'state', 'RECOGNITION OVER', 3000 * config.timeoutAmplificator);

    checkLabel(strokes.length - 1, resultSelector, emptyResultSelector);

    browser
      .verify.attributeEquals('#inkPaperSupervisor', 'data-canclear', String(true))
      .click('#clear')
      .waitUntilElementPropertyEqual('#inkPaperSupervisor', 'nbstrokes', 0, 3000 * config.timeoutAmplificator)
      .log(start);
    const now = new Date().getTime();
    done(now);
  }

  function predicate(now) {
    return ((now - start) > 10000);
  }

  function callbackResult(res) {
    if (typeof callback === 'function') {
      callback.call(browser, res);
    }
  }

  return browser.waitUntil(playInkThenClear, predicate, timeout, callbackResult);
};
