exports.command = function log(startTime, message) {
  const browser = this;

  function clog(elapsedTime) {
    if (message != null) {
      // eslint-disable-next-line no-console
      console.log(String(elapsedTime.value / 1000) + ' ' + message);
    } else {
      // eslint-disable-next-line no-console
      console.log(String(elapsedTime.value / 1000));
    }
  }

  function buildLog() {
    browser.getElapsedTime(startTime, clog);
  }

  browser.perform(buildLog);
  return this;
};
