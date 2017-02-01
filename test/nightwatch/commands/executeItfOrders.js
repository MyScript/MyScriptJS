exports.command = function executeItfOrders(element, property, orders, timeout, callback) {
  // eslint-disable-next-line global-require
  const async = require('async');

  const client = this;
  let result = null;

  function internalCallbackResult(res) {
    callback(null, res.value);
  }

  function internalCallbackResultChange(res) {
    callback(null, res);
  }

  function getResultCallback(done) {
    client.getProperty(element, property, internalCallbackResult);
  }

  function executeOrderCallback(res, done) {
    client.playStrokes('myscript-common-element', orders.filter(order => order.stroke !== undefined).map(order => order.stroke), 100, 100, done);
  }

  function waitResultChangeCallback(res, done) {
    client.pause(timeout + 3000).waitUntilResultChange(element, property, res.getResult, timeout, internalCallbackResultChange);
  }

  const asyncTasks = {
    getResult: getResultCallback,
    executeOrder: ['getResult', executeOrderCallback],
    waitResultChange: ['getResult', 'executeOrder', waitResultChangeCallback]
  };

  async.auto(asyncTasks, function done(err, res) {
    if (!err) {
      // console.info('Recognition result: ' + JSON.stringify(res.waitResultChange));
      result = res.waitResultChange;
    } else {
      // console.error(err);
    }
    if (typeof callback === 'function') {
      callback.call(this, result);
    }
  });

  return this;
};
