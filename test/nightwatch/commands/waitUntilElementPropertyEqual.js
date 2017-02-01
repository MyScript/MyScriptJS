exports.command = function waitUntilPropertyEqual(element, property, expected, timeout, callback) {
  const browser = this;

  function getActualValue(done) {
    browser.getProperty(element, property, (value) => {
      done(value);
    });
  }

  function predicate(actual) {
    return (expected === actual);
  }

  return browser.waitUntil(getActualValue, predicate, timeout, (result) => {
    if (typeof callback === 'function') {
      callback.call(browser, result);
    }
  });
};
