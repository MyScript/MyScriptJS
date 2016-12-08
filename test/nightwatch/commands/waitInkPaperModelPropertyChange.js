exports.command = function (element, property, expected, timeout, callback) {
  const browser = this;

  function getActualValue(done) {
    browser.getProperty(element, 'data-myscript-ink-paper', function (inkPaperObject) {
      console.log(JSON.stringify(inkPaperObject.model));
      if(inkPaperObject && inkPaperObject.model){
        done(inkPaperObject.model.rawResult);
      } else {
        done();
      }
    });
  }

  function predicate(actual) {
    console.log('expected: ', expected, ', actual: ', actual);
    return (expected !== actual);
  }

  return browser.waitUntil(getActualValue, predicate, timeout, function (result) {
    if (typeof callback === 'function') {
      callback.call(browser, result);
    }
  });
};
