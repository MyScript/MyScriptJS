(function (scope) {

    /**
     * Network interface
     * @constructor
     */
    function NetworkInterface() {
    }

    NetworkInterface.parse = function (req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return [result, req];
    };

    NetworkInterface.xhr = function (type, url, data) {
        var methods = {
            success: function () {
            },
            error: function () {
            }
        };
        var XHR = scope.XMLHttpRequest || ActiveXObject;
        var request = new XHR('MSXML2.XMLHTTP.3.0');
        request.open(type, url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    methods.success.apply(methods, this.parse(request));
                } else {
                    methods.error.apply(methods, this.parse(request));
                }
            }
        };
        request.send(data);
        var callbacks = {
            success: function (callback) {
                methods.success = callback;
                return callbacks;
            },
            error: function (callback) {
                methods.error = callback;
                return callbacks;
            }
        };

        return callbacks;
    };

    NetworkInterface.prototype.get = function (src) {
        return this.xhr('GET', src);
    };

    NetworkInterface.prototype.put = function (url, data) {
        return this.xhr('PUT', url, data);
    };

    NetworkInterface.prototype.post = function (url, data) {
        return this.xhr('POST', url, data);
    };

    NetworkInterface.prototype.delete = function (url) {
        return this.xhr('DELETE', url);
    };

    // Export
    scope.NetworkInterface = NetworkInterface;
})(MyScript);
