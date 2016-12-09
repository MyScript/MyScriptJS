var util = require('util');
var events = require('events');
var TIMEOUT_RETRY_INTERVAL = 500;

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
 * @param timeoutInMilliseconds {Number} - the number of milliseconds to wait before timing out and failing.
 * @param message {String} - the message to attach to the assertion. The elapsed time will be appended to this.
 * @return custom command waitUntil, which can be accessed as browser.waitUntil(args);
 */
waitUntil.prototype.command = function (getActual, predicate, timeoutInMilliseconds, callback) {
    var message = 'WaitUntil';
    this.startTimeInMilliseconds = new Date().getTime();
    var self = this;

    this.check(getActual, predicate, function (actual, loadedTimeInMilliseconds) {
        if (predicate(actual)) {
            message += ' was available after '
                + (loadedTimeInMilliseconds - self.startTimeInMilliseconds) + ' milliseconds.';
        } else {
            message += ' timed out after ' + timeoutInMilliseconds + ' milliseconds.';
        }
        callback(actual, message);
        self.emit('complete');
    }, timeoutInMilliseconds);

    return this;
};

waitUntil.prototype.check = function (getActual, predicate, callback, maxTimeInMilliseconds) {
    var self = this;
    getActual(function (result) {
        // If the argument passed to the callback is an object, it is assumed that the format is of the argument passed
        // to callbacks by the Nightwatch API, in which the object has a "value" attribute with the actual information.
        var resultValue;
        if (typeof result !== 'object') {
            resultValue = result;
        } else if (result.hasOwnProperty('value')) {
            resultValue = result.value;
        } else {
            self.error('Result object does not have a value.');
            return;
        }

        var now = new Date().getTime();
        if (predicate(resultValue)) {
            callback(resultValue, now);
        } else if (now - self.startTimeInMilliseconds < maxTimeInMilliseconds) {
            setTimeout(function () {
                self.check(getActual, predicate, callback, maxTimeInMilliseconds);
            }, TIMEOUT_RETRY_INTERVAL);
        } else {
            callback(resultValue, null);
        }
    });
};

module.exports = waitUntil;
