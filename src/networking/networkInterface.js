'use strict';

(function (scope, Q) {
    /**
     * Network interface
     *
     * @class NetworkInterface
     * @constructor
     */
    function NetworkInterface() {
    }

    /**
     * Parse JSON String to Object
     *
     * @method parse
     * @param {Object} req
     * @returns {Object}
     */
    NetworkInterface.parse = function (req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return result;
    };

    /**
     * Transform object data request to a list of parameters
     *
     * @method transformRequest
     * @param {Object} [obj]
     * @returns {String}
     */
    NetworkInterface.transformRequest = function (obj) {
        var str = [];
        for (var p in obj) {
            if ((typeof obj[p] !== 'undefined') &&
                (typeof obj[p] !== 'function')) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    };

    /**
     * Send request to the network and return a promise
     *
     * @method xhr
     * @param {String} type
     * @param {String} url
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.prototype.xhr = function (type, url, data) {

        var deferred = Q.defer();

        function onStateChange() {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    deferred.resolve(NetworkInterface.parse(request));
                } else {
                    deferred.reject(NetworkInterface.parse(request));
                }
            }
        }

        function onLoad() {
            if (request.status >= 200 && request.status < 300) {
                deferred.resolve(NetworkInterface.parse(request));
            } else {
                deferred.reject('Status code was ' + request.status);
            }
        }

        function onError() {
            deferred.reject('Can\'t XHR ' + JSON.stringify(url));
        }

        function onProgress(event) {
            deferred.notify(event.loaded / event.total);
        }

        var request = new XMLHttpRequest();
        request.open(type, url, true);
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        request.onload = onLoad;
        request.onerror = onError;
        request.onprogress = onProgress;
        request.onreadystatechange = onStateChange;
        request.send(NetworkInterface.transformRequest(data));

        return deferred.promise;
    };

    /**
     * Get request
     *
     * @method get
     * @param {String} src
     * @param {Object} params
     * @returns {Promise}
     */
    NetworkInterface.prototype.get = function (src, params) {
        if (params) {
            src += '?' + NetworkInterface.transformRequest(params);
        }
        return this.xhr('GET', src).then(
            function success(response) {
                return response;
            }, function error(response) {
                throw response;
            });
    };

    /**
     * Put request
     *
     * @method put
     * @param {String} src
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.prototype.put = function (url, data) {
        return this.xhr('PUT', url, data).then(
            function success(response) {
                return response;
            }, function error(response) {
                throw response;
            });
    };

    /**
     * Post request
     *
     * @method post
     * @param {String} src
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.prototype.post = function (url, data) {
        return this.xhr('POST', url, data).then(
            function success(response) {
                return response;
            }, function error(response) {
                throw response;
            });
    };

    /**
     * Delete request
     *
     * @method delete
     * @param {String} src
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.prototype.delete = function (url, data) {
        return this.xhr('DELETE', url, data).then(
            function success(response) {
                return response;
            }, function error(response) {
                throw response;
            });
    };

    // Export
    scope.NetworkInterface = NetworkInterface;
})(MyScript, Q);
