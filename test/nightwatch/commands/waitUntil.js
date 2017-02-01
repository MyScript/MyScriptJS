const util = require('util');
const events = require('events');

const TIMEOUT_RETRY_INTERVAL = 500;

function waitUntil() {
  events.EventEmitter.call(this);
  this.startTimeInMilliseconds = null;
}

util.inherits(waitUntil, events.EventEmitter);

/**
 * The purpose of this command is to serve as a base for waitUntil_ commands. It will run the getActual function until
 * the predicate function return true or the timeout is reached. At that point, the assertion function will be called.
 * @param getActual {Function} - should passe the found value to its callback. The callback will be passed as the only
 *      argument.
 * @param predicate {Function} - the wait will end when this return true. The actual value is passed as the only
 *      argument.
 * @param assertion {Function} - the assertion to make. The assertion should pass when the predicate return true. This
 *      function will be passed the actual value and the message.
 * @param timeoutInMilliseconds {Number} - the Number of milliseconds to wait before timing out and failing.
 * @param message {String} - the message to attach to the assertion. The elapsed time will be appended to this.
 * @return custom command waitUntil, which can be accessed as browser.waitUntil(args);
 */
waitUntil.prototype.command = function waitUntilCommand(getActual, predicate, timeoutInMilliseconds, callback) {
  let message = 'WaitUntil';
  this.startTimeInMilliseconds = new Date().getTime();
  const self = this;

  function checkResult(actual, loadedTimeInMilliseconds) {
    if (predicate(actual)) {
      message += ' was available after '
          + (loadedTimeInMilliseconds - self.startTimeInMilliseconds) + ' milliseconds.';
    } else {
      message += ' timed out after ' + timeoutInMilliseconds + ' milliseconds.';
    }
    callback(actual, message);
    self.emit('complete');
  }

  this.check(getActual, predicate, checkResult, timeoutInMilliseconds);

  return this;
};

waitUntil.prototype.check = function waitUntilCheck(getActual, predicate, callback, maxTimeInMilliseconds) {
  const self = this;

  function checkResult(result) {
    // If the argument passed to the callback is an object, it is assumed that the format is of the argument passed
    // to callbacks by the Nightwatch API, in which the object has a "value" attribute with the actual information.
    let resultValue;
    if (typeof result !== 'object') {
      resultValue = result;
      // eslint-disable-next-line no-prototype-builtins
    } else if (result.hasOwnProperty('value')) {
      resultValue = result.value;
    } else {
      self.error('Result object does not have a value.');
      return;
    }

    function deferredCheck() {
      self.check(getActual, predicate, callback, maxTimeInMilliseconds);
    }

    const now = new Date().getTime();
    if (predicate(resultValue)) {
      callback(resultValue, now);
    } else if (now - self.startTimeInMilliseconds < maxTimeInMilliseconds) {
      setTimeout(deferredCheck, TIMEOUT_RETRY_INTERVAL);
    } else {
      callback(resultValue, null);
    }
  }

  getActual(checkResult);
};

module.exports = waitUntil;
