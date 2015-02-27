'use strict';

(function (scope) {
    /**
     * Abstract WebSocket recognizer interface
     *
     * @class AbstractWSRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function AbstractWSRecognizer (host) {
        scope.AbstractRecognizer.call(this, host);
    }

    /**
     * Inheritance property
     */
    AbstractWSRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    AbstractWSRecognizer.prototype.constructor = AbstractWSRecognizer;

    AbstractWSRecognizer.prototype.getMessageCallback = function () {
        return this.messageCallback;
    };

    AbstractWSRecognizer.prototype.setMessageCallback = function (callback) {
        this.messageCallback = callback;
    };

    AbstractWSRecognizer.prototype.getOpenCallback = function () {
        return this.openCallback;
    };

    AbstractWSRecognizer.prototype.setOpenCallback = function (callback) {
        this.openCallback = callback;
    };

    AbstractWSRecognizer.prototype.getCloseCallback = function () {
        return this.closeCallback;
    };

    AbstractWSRecognizer.prototype.setCloseCallback = function (callback) {
        this.closeCallback = callback;
    };

    AbstractWSRecognizer.prototype.getErrorCallback = function () {
        return this.errorCallback;
    };

    AbstractWSRecognizer.prototype.setErrorCallback = function (callback) {
        this.errorCallback = callback;
    };

    /**
     * Get the current state of the connection
     *
     * @method getState
     * @returns {Promise}
     */
    AbstractWSRecognizer.prototype.getState = function () {
        var deferred = Q.defer();
        if (!this.socket) {
            deferred.reject(new Error('Can\'t find WebSocket'));
        }
        deferred.resolve(this.socket.readyState);
        return deferred.promise;
    };

    /**
     * Close the socket
     *
     * @method close
     * @returns {Promise}
     */
    AbstractWSRecognizer.prototype.close = function () {
        var deferred = Q.defer();
        if (!this.socket) {
            deferred.reject(new Error('Can\'t find WebSocket'));
        }
        deferred.resolve(this.socket.close());
        return deferred.promise;
    };

    /**
     * Send a message
     *
     * @method sendMessage
     * @param {AbstractWSMessage} message
     * @returns {Promise}
     */
    AbstractWSRecognizer.prototype.sendMessage = function (message) {
        var deferred = Q.defer();
        if (!this.socket) {
            deferred.reject(new Error('Can\'t find WebSocket'));
        }
        deferred.resolve(this.socket.send(JSON.stringify(message)));
        return deferred.promise;
    };

    /**
     * Initialize the WebSocket
     *
     * @method initWSRecognition
     * @param {String} applicationKey
     * @returns {Promise}
     */
    AbstractWSRecognizer.prototype.initWSRecognition = function (applicationKey) {
        var message = new scope.InitRequestWSMessage();
        message.setApplicationKey(applicationKey);
        return this.sendMessage(message);
    };

    /**
     * Authenticate the WebSocket client end with a handshake of HMAC signature
     *
     * @method takeUpHmacChallenge
     * @param {String} applicationKey
     * @param {String} challenge
     * @param {String} hmacKey
     * @returns {Promise}
     */
    AbstractWSRecognizer.prototype.takeUpHmacChallenge = function (applicationKey, challenge, hmacKey) {
        var message = new scope.ChallengeRequestWSMessage();
        message.setApplicationKey(applicationKey);
        message.setChallenge(challenge);
        message.setHmacSignature(this.computeHmac(applicationKey, challenge, hmacKey));
        return this.sendMessage(message);
    };

    /**
     * Reset the WebSocket recognition session
     *
     * @method resetWSRecognition
     * @returns {Promise}
     */
    AbstractWSRecognizer.prototype.resetWSRecognition = function () {
        var message = new scope.ResetRequestWSMessage();
        return this.sendMessage(message);
    };

    // Export
    scope.AbstractWSRecognizer = AbstractWSRecognizer;
})(MyScript);