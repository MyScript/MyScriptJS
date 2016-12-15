'use strict';

(function (scope, CryptoJS) {
    /**
     * Abstract WebSocket recognizer interface
     *
     * @class AbstractWSRecognizer
     * @constructor
     */
    function AbstractWSRecognizer() {
        this._wsInterface = new scope.NetworkWSInterface();
    }

    AbstractWSRecognizer.prototype.getProtocol = function() {
        return this._ssl? 'wss://': 'ws://';
    };

    AbstractWSRecognizer.prototype.getSSL = function() {
        return this._ssl;
    };

    AbstractWSRecognizer.prototype.setSSL = function (ssl) {
        if (ssl !== undefined) {
            this._ssl = ssl;
            this.setUrl(this.getProtocol() + this.getHost());
        }
    };

    /**
     * Get the recognition service host
     *
     * @method getHost
     * @returns {string|String|*}
     */
    AbstractWSRecognizer.prototype.getHost = function() {
        return scope.NetworkInterface.parseURL(this.getUrl()).host;
    };

    /**
     * Set the recognition service host
     *
     * @method setHost
     * @param {String}
     */
    AbstractWSRecognizer.prototype.setHost = function (host) {
        if ((host !== undefined) && (host != this.getHost())) {
            this.setUrl(this.getProtocol() + host);
        }
    };

    AbstractWSRecognizer.prototype.setUrl = function (url) { // jshint ignore:line
        throw new Error('not implemented');
    };

    AbstractWSRecognizer.prototype.getUrl = function () {
        return this._wsInterface.getUrl();
    };

    AbstractWSRecognizer.prototype.setCallback = function (callback) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {AbstractParameter}
     */
    AbstractWSRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {AbstractParameter} parameters
     */
    AbstractWSRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Get precision
     *
     * @method getPrecision
     * @returns {Number}
     */
    AbstractWSRecognizer.prototype.getPrecision = function () {
        return this.precision;
    };

    /**
     * Set precision
     *
     * @method setPrecision
     * @param {Number} precision
     */
    AbstractWSRecognizer.prototype.setPrecision = function (precision) {
        this.precision = precision;
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
        if (message.getComponents) {
            _filterStrokes(message.getComponents(), this.getPrecision());
        } else if (message.getInputUnits) {
            for (var i in message.getInputUnits()) {
                _filterStrokes(message.getInputUnits()[i].getComponents(), this.getPrecision());
            }
        }
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
            message.setHmacSignature(_computeHmac(challenge, applicationKey, hmacKey));
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

    /**
     * Compute HMAC signature for server authentication
     *
     * @private
     * @method _computeHmac
     * @param {String} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     */
    var _computeHmac = function (input, applicationKey, hmacKey) {
        var jsonInput = (typeof input === 'object') ? JSON.stringify(input) : input;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    };

    var _filterStrokes = function (components, precision) {
        components.forEach(function (currentValue) {
            if (currentValue instanceof scope.StrokeComponent) {
                currentValue.toFixed(precision);
            }
        });
    };

    // Export
    scope.AbstractWSRecognizer = AbstractWSRecognizer;
})(MyScript, CryptoJS);
