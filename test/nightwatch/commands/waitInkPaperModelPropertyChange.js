exports.command = function waitInkPaperModelPropertyChange(element, property, expected, timeout, callback) {
  const browser = this;

  function getActualValue(done) {
    browser.getProperty(element, 'data-myscript-ink-paper', (inkPaperObject) => {
      // console.log(JSON.stringify(inkPaperObject.model));
      if (inkPaperObject && inkPaperObject.model) {
        done(inkPaperObject.model.rawResult);
      } else {
        done();
      }
    });
  }

  function predicate(actual) {
    // console.log('expected: ', expected, ', actual: ', actual);
    return (expected !== actual);
  }

  function callbackResult(res) {
    if (typeof callback === 'function') {
      callback.call(browser, res);
    }
  }

  return browser.waitUntil(getActualValue, predicate, timeout, callbackResult);
};
