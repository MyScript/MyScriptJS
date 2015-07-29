'use strict';
/* jshint ignore:start */

(function (scope, Q) {
    /**
     * Network interface
     *
     * @class NetworkWSInterface
     * @constructor
     */
    function NetworkWSInterface(url, callback) {
        this._url = url;
        this._callback = callback;
    }

    NetworkWSInterface.prototype.send = function (request) {
        if (this._socket) {
            this._socket.send(JSON.stringify(request));
        }
    };

    NetworkWSInterface.prototype.isClosed = function () {
        if (this._socket) {
            return this._socket.readyState === 3;
        }
        return false;
    };

    NetworkWSInterface.prototype.isClosing = function () {
        if (this._socket) {
            return this._socket.readyState === 2;
        }
        return false;
    };

    NetworkWSInterface.prototype.isOpen = function () {
        if (this._socket) {
            return this._socket.readyState === 1;
        }
        return false;
    };

    NetworkWSInterface.prototype.isConnecting = function () {
        if (this._socket) {
            return this._socket.readyState === 0;
        }
        return false;
    };

    NetworkWSInterface.prototype.close = function (code, reason) {
        if (this._socket) {
            this._socket.close(code, reason);
        }
    };

    NetworkWSInterface.prototype.open = function () {
        var self = this;
        this._socket = new WebSocket(this._url);

        this._socket.onopen = function (e) {
            self._callback(e);
        };
        this._socket.onclose = function (e) {
            self._callback(e);
        };
        this._socket.onerror = function (e) {
            self._callback(e);
        };

        this._socket.onmessage = function (e) {
            self._callback({
                type: e.type,
                data: JSON.parse(e.data)
            });
        };
    };

    // Export
    scope.NetworkWSInterface = NetworkWSInterface;
})(MyScript, Q);
/* jshint ignore:end */
