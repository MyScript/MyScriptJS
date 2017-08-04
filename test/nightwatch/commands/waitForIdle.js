exports.command = function waitForIdle(element, callback) {
  function clientIdle(args) {
    try {
      element.editor.waitForIdle();
    } catch (e) {
      // console.log('error clientIdle' + e);
      return false;
    }
    return true;
  }

  function finish(args) {
    if (!args.state || args.state !== 'success') {
      // console.log(args);
    }
  }

  this.execute(clientIdle, [element], finish);

  if (typeof callback === 'function') {
    callback.call(this);
  }
  return this;
};
