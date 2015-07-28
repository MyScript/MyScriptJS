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
    function AbstractWSRecognizer(host) {
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

    AbstractWSRecognizer.prototype._init = function (endpoint, callback) {
        this._wsInterface = new scope.NetworkWSInterface(endpoint, callback);
    };

    AbstractWSRecognizer.prototype.isClosed = function () {
        return this._wsInterface.isClosed();
    };

    AbstractWSRecognizer.prototype.isClosing = function () {
        return this._wsInterface.isClosing();
    };

    AbstractWSRecognizer.prototype.isOpen = function () {
        return this._wsInterface.isOpen();
    };

    AbstractWSRecognizer.prototype.isConnecting = function () {
        return this._wsInterface.isConnecting();
    };

    /**
     * Open the socket
     *
     * @method open
     */
    AbstractWSRecognizer.prototype.open = function () {
        this._wsInterface.open();
    };

    /**
     * Close the socket
     *
     * @method close
     */
    AbstractWSRecognizer.prototype.close = function () {
        this._wsInterface.close();
    };

    /**
     * Send a message
     *
     * @method sendMessage
     * @param {AbstractWSMessage} message
     */
    AbstractWSRecognizer.prototype.sendMessage = function (message) {
        this._wsInterface.send(message);
    };

    /**
     * Initialize the WebSocket
     *
     * @method initWSRecognition
     * @param {String} applicationKey
     */
    AbstractWSRecognizer.prototype.initWSRecognition = function (applicationKey) {
        var message = new scope.InitRequestWSMessage();
        message.setApplicationKey(applicationKey);
        this.sendMessage(message);
    };

    /**
     * Authenticate the WebSocket client end with a handshake of HMAC signature
     *
     * @method takeUpHmacChallenge
     * @param {String} applicationKey
     * @param {String} challenge
     * @param {String} hmacKey
     */
    AbstractWSRecognizer.prototype.takeUpHmacChallenge = function (applicationKey, challenge, hmacKey) {
        var message = new scope.ChallengeRequestWSMessage();
        message.setApplicationKey(applicationKey);
        message.setChallenge(challenge);
        if (hmacKey) {
            message.setHmacSignature(this.computeHmac(applicationKey, challenge, hmacKey));
        }
        this.sendMessage(message);
    };

    /**
     * Reset the WebSocket recognition session
     *
     * @method resetWSRecognition
     */
    AbstractWSRecognizer.prototype.resetWSRecognition = function () {
        var message = new scope.ResetRequestWSMessage();
        this.sendMessage(message);
    };

    // Export
    scope.AbstractWSRecognizer = AbstractWSRecognizer;
})(MyScript);