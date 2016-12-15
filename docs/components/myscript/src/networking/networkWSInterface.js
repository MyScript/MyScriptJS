'use strict';
/* jshint ignore:start */

(function (scope, Q) {
    /**
     * Network interface
     *
     * @class NetworkWSInterface
     * @constructor
     */
    function NetworkWSInterface() {
    }

    NetworkWSInterface.prototype.setUrl = function (url) {
        if ((url !== undefined) && (url !== this._url)) {
            this.close();
            this._url = url;
        }
    };

    NetworkWSInterface.prototype.getUrl = function () {
        return this._url;
    };

    NetworkWSInterface.prototype.setCallback = function (callback) {
        if (callback !== undefined) {
            this.close();
            this._callback = callback;
        }
    };

    NetworkWSInterface.prototype.getCallback = function () {
        return this._callback;
    };

    NetworkWSInterface.prototype.getState = function () {
        return _getWebSocketState(this._socket);
    };

    NetworkWSInterface.prototype.isClosed = function () {
        return this.getState() === 3;
    };

    NetworkWSInterface.prototype.isClosing = function () {
        return this.getState() === 2;
    };

    NetworkWSInterface.prototype.isOpen = function () {
        return this.getState() === 1;
    };

    NetworkWSInterface.prototype.isConnecting = function () {
        return this.getState() === 0;
    };

    NetworkWSInterface.prototype.open = function () {
        if (this.getUrl() && this.getCallback() && ((this.getState() < 0) || this.isClosed())) {
            this._socket = _openWebSocket(this.getUrl(), this.getCallback());
        }
    };

    NetworkWSInterface.prototype.close = function (code, reason) {
        if (this.getState() < 2) {
            _closeWebSocket(this._socket, code, reason);
        }
    };

    NetworkWSInterface.prototype.send = function (request) {
        var state = _getWebSocketState(this._socket);
        if (state  === 1) {
            _sendMessage(this._socket, request);
        } else {
            this.open();
        }
    };

    /**
     *
     * @param url
     * @param callback
     * @returns {WebSocket}
     * @private
     */
    var _openWebSocket = function (url, callback) {
        function onOpen(e) {
            callback(e);
        }
        function onClose(e) {
            callback(e);
        }
        function onError(e) {
            callback(e);
        }
        function onMessage(e) {
            callback({
                type: e.type,
                data: JSON.parse(e.data)
            });
        }

        var socket = new WebSocket(url);
        socket.onopen = onOpen;
        socket.onclose = onClose;
        socket.onerror = onError;
        socket.onmessage = onMessage;
        return socket;
    };

    /**
     *
     * @param socket
     * @param code
     * @param reason
     * @private
     */
    var _closeWebSocket = function (socket, code, reason) {
        if (socket) {
            socket.close(code, reason);
        }
    };

    /**
     *
     * @param socket
     * @returns {*}
     * @private
     */
    var _getWebSocketState = function (socket) {
        if (socket) {
            return socket.readyState;
        }
        return -1;
    };

    /**
     *
     * @param socket
     * @param message
     * @private
     */
    var _sendMessage = function (socket, message) {
        if (socket) {
            socket.send(JSON.stringify(message));
        }
    };

    // Export
    scope.NetworkWSInterface = NetworkWSInterface;
})(MyScript, Q);
/* jshint ignore:end */
