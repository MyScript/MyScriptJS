(function (scope) {

    /**
     * Network interface
     * @constructor
     */
    function NetworkInterface () {
    }

    /**
     * Parse JSON String to Object
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
     * @param {Object} obj
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
     * @param {String} type
     * @param {String} url
     * @param {Object} data
     * @returns {MyScript.Promise}
     */
    NetworkInterface.prototype.xhr = function (type, url, data) {

        return new scope.Promise(function (resolve, reject) {

            var request = new XMLHttpRequest('MSXML2.XMLHTTP.3.0');
            request.open(type, url, true);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(NetworkInterface.parse(request));
                    } else {
                        reject(NetworkInterface.parse(request));
                    }
                }
            };
            request.send(NetworkInterface.transformRequest(data));
        });
    };

    /**
     * Get request
     * @param {String} src
     * @param {Object} params
     * @returns {MyScript.Promise|*}
     */
    NetworkInterface.prototype.get = function (src, params) {
        if (params) {
            src += '?' + NetworkInterface.transformRequest(params);
        }
        return this.xhr('GET', src);
    };

    /**
     * Put request
     * @param {String} src
     * @param {Object} data
     * @returns {MyScript.Promise|*}
     */
    NetworkInterface.prototype.put = function (url, data) {
        return this.xhr('PUT', url, data);
    };

    /**
     * Post request
     * @param {String} src
     * @param {Object} data
     * @returns {MyScript.Promise|*}
     */
    NetworkInterface.prototype.post = function (url, data) {
        return this.xhr('POST', url, data);
    };

    /**
     * Delete request
     * @param {String} src
     * @param {Object} data
     * @returns {MyScript.Promise|*}
     */
    NetworkInterface.prototype.delete = function (url) {
        return this.xhr('DELETE', url);
    };

    // Export
    scope.NetworkInterface = NetworkInterface;
})(MyScript);
