exports.command = function waitForIdle(element, timeout, callback) {
  function waitForEditorIdle(client, done) {
    client
      .click('#waitForIdle')
      .waitUntilElementPropertyEqual(element, 'idle', true, timeout, done);
  }

  this.perform(waitForEditorIdle);

  if (typeof callback === 'function') {
    callback.call(this);
  }
  return this;
};
