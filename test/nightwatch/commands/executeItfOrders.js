exports.command = function (element, property, orders, timeout, callback) {
    var client = this;
    var async = require('async');

    var result = null;

    async.auto({
        getResult: function (callback) {
            client.getProperty(element, property, function (result) {
                callback(null, result.value);
            });
        },
        executeOrder: ['getResult', function (results, callback) {
            client.playStrokes('myscript-common-element', orders.filter(order => order.stroke !== undefined).map(order => order.stroke), 100, 100, callback);
        }],
        waitResultChange: ['getResult', 'executeOrder', function (results, callback) {
            client.pause(timeout + 3000).waitUntilResultChange(element, property, results.getResult, timeout, function (result) {
                callback(null, result);
            });
        }]
    }, function (err, res) {
        if (!err) {
            // console.info('Recognition result: ' + JSON.stringify(res.waitResultChange));
            result = res.waitResultChange;
        } else {
            console.error(err);
        }
        if (typeof callback === 'function') {
            callback.call(this, result);
        }
    });

    return this;
};
