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

    NetworkInterface.parseURL = function (url) {

        var parser = document.createElement('a'),
            searchObject = {},
            queries, split, i;
        // Let the browser do the work
        parser.href = url;
        // Convert query string to object
        queries = parser.search.replace(/^\?/, '').split('&');
        for (i = 0; i < queries.length; i++) {
            split = queries[i].split('=');
            searchObject[split[0]] = split[1];
        }
        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            searchObject: searchObject,
            hash: parser.hash
        };
    };

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
    NetworkInterface.xhr = function (type, url, data) {

        return Q.Promise(function (resolve, reject, notify) {

            function onStateChange() {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(NetworkInterface.parse(request));
                    }
                }
            }

            function onLoad() {
                if (request.status >= 200 && request.status < 300) {
                    resolve(NetworkInterface.parse(request));
                } else {
                    reject(new Error(request.responseText));
                }
            }

            function onError() {
                reject(new Error('Can\'t XHR ' + url));
            }

            function onProgress(e) {
                notify(e.loaded / e.total);
            }

            var request = new XMLHttpRequest();
            request.open(type, url, true);
            request.withCredentials = true;
            request.setRequestHeader('Accept', 'application/json');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            request.onerror = onError;
            request.onprogress = onProgress;
            request.onload = onLoad;
            request.onreadystatechange = onStateChange;
            request.send(NetworkInterface.transformRequest(data));
        });
    };

    /**
     * Get request
     *
     * @method get
     * @param {String} src
     * @param {Object} params
     * @returns {Promise}
     */
    NetworkInterface.get = function (src, params) {
        if (params) {
            src += '?' + NetworkInterface.transformRequest(params);
        }
        return scope.NetworkInterface.xhr('GET', src, undefined);
    };

    /**
     * Put request
     *
     * @method put
     * @param {String} url
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.put = function (url, data) {
        return scope.NetworkInterface.xhr('PUT', url, data);
    };

    /**
     * Post request
     *
     * @method post
     * @param {String} url
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.post = function (url, data) {
        return scope.NetworkInterface.xhr('POST', url, data);
    };

    /**
     * Delete request
     *
     * @method delete
     * @param {String} url
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.delete = function (url, data) {
        return scope.NetworkInterface.xhr('DELETE', url, data);
    };

    // Export
    scope.NetworkInterface = NetworkInterface;
})(MyScript, Q);
