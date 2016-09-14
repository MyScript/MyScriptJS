'use strict';
/* jshint ignore:start */

class networkWSInterface {

    constructor(){

    }


    isClosed = function (websocket) {
        return websocket.readyState === 3;
    };

    isClosing = function (websocket) {
        return websocket.readyState === 2;
    };

    isOpen = function (websocket) {
        return websocket.readyState === 1;
    };

    isConnecting = function (websocket) {
        return websocket.readyState === 0;
    };

    close = function (websocket, code, reason) {
        if (websocket.readyState < 2) {
            websocket.close(code, reason);
        }
    };

    send = function (websocket, message) {
        var state = websocket.readyState;
        if (state  === 1) {
            websocket.send(JSON.stringify(message))
        }
    };

    /**
     *
     * @param url
     * @param callback
     * @returns {WebSocket}
     * @private
     */
    openWebSocket = function (url, callback) {
        function onOpen(e) {
            logger.debug("onOpen");
            callback(e);
        }
        function onClose(e) {
            logger.debug("onClose");
            callback(e);
        }
        function onError(e) {
            logger.debug("onError");
            callback(e);
        }
        function onMessage(e) {
            logger.debug("onMessage");
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
     * @param message
     * @private
     */
    sendMessage = function (socket, message) {
        if (socket) {
            socket.send(JSON.stringify(message));
        }
    };

}
export default networkWSInterface;
/* jshint ignore:end */
