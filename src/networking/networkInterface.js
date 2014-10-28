(function (scope) {

    /**
     * Network interface
     * @constructor
     */
    function NetworkInterface () {
    }

    NetworkInterface.parse = function (req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return result;
    };

    NetworkInterface.transformRequest = function (obj) {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
    };

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
