exports.command = function log(startTime, message) {
  const browser = this;

  function clog(elapsedTime) {
    if (message != null) {
      console.log(String(elapsedTime.value / 1000) + ' ' + message);
    } else {
      console.log(String(elapsedTime.value / 1000));
    }
  }

  function buildLog() {
    browser.getElapsedTime(startTime, clog);
  }

  browser.perform(buildLog);
  return this;
};
