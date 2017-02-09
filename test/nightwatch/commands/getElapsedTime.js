exports.command = function getElapsedTime(startTime, callback) {
  const browser = this;

  function elapsedTime(start) {
    const now = new Date().getTime();
    return (now - start);
  }

  function callbackCall(result) {
    if (typeof callback === 'function') {
      callback.call(browser, result);
    }
  }

  browser.execute(elapsedTime, [startTime], callbackCall);
  return this;
};
