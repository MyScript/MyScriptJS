exports.command = function waitEditorModelPropertyChange(element, property, expected, timeout, callback) {
  const browser = this;

  function getActualValue(done) {
    browser.getProperty(element, 'data-myscript-editor', (editorObject) => {
      // console.log(JSON.stringify(editorObject.model));
      if (editorObject && editorObject.model) {
        done(editorObject.model.rawResult);
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
