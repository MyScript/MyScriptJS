(function (scope, Q) {
    'use strict';
    /**
     * Text websocket recognizer interface
     *
     * @class TextWSRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function TextWSRecognizer (host) {
        scope.AbstractRecognizer.call(this, host);
        this.socket = new WebSocket('ws://' + this.host + '/api/v3.0/recognition/ws/text');
    }

    /**
     * Inheritance property
     */
    TextWSRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    TextWSRecognizer.prototype.constructor = TextWSRecognizer;

    /**
     * Set websocket open callback
     *
     * @method setOpenCallback
     * @param callback
     */
    TextWSRecognizer.prototype.setOpenCallback = function (callback) {
        this.socket.onopen = callback;
    };

    /**
     * Set websocket close callback
     *
     * @method setCloseCallback
     * @param callback
     */
    TextWSRecognizer.prototype.setCloseCallback = function (callback) {
        this.socket.onclose = callback;
    };

    /**
     * Set websocket error callback
     *
     * @method setErrorCallback
     * @param callback
     */
    TextWSRecognizer.prototype.setErrorCallback = function (callback) {
        this.socket.onerror = callback;
    };

    /**
     * Set websocket data callback
     *
     * @method setDataCallback
     * @param callback
     */
    TextWSRecognizer.prototype.setDataCallback = function (callback) {
        this.socket.onmessage = callback;
    };

    /**
     * Initialize the websocket
     *
     * @method initWSRecognition
     * @param {String} applicationKey
     */
    TextWSRecognizer.prototype.initWSRecognition = function (applicationKey) {
        if (!this.socket) {
            return;
        }

        var initMessage = {
            type: 'applicationKey',
            applicationKey: applicationKey
        };

        var deferred = Q.defer();
        deferred.resolve(this.socket.send(JSON.stringify(initMessage)));
        return deferred.promise;
    };

    /**
     * Start the websocket session
     *
     * @method startWSRecognition
     * @param {TextParameter} parameters
     * @param {TextInputUnit[]} inputUnits
     */
    TextWSRecognizer.prototype.startWSRecognition = function (parameters, inputUnits) {
        if (!this.socket) {
            return;
        }

        var input = new scope.TextRecognitionInput();
        input.setParameters(parameters);
        input.setInputUnits(inputUnits);

        input.type = 'start';

        var deferred = Q.defer();
        deferred.resolve(this.socket.send(JSON.stringify(input)));
        return deferred.promise;
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {TextInputUnit[]} inputUnits
     */
    TextWSRecognizer.prototype.continueWSRecognition = function (inputUnits, instanceId) {
        if (!this.socket) {
            return;
        }

        var continueMessage = {
            type: 'continue',
            inputUnits: inputUnits,
            instanceId: instanceId
        };

        var deferred = Q.defer();
        deferred.resolve(this.socket.send(JSON.stringify(continueMessage)));
        return deferred.promise;
    };

    /**
     * Reset the websocket recognition session
     *
     * @method resetWSRecognition
     */
    TextWSRecognizer.prototype.resetWSRecognition = function () {
        if (!this.socket) {
            return;
        }

        var resetMessage = {
            type: 'reset'
        };

        var deferred = Q.defer();
        deferred.resolve(this.socket.send(JSON.stringify(resetMessage)));
        return deferred.promise;
    };

    /**
     * Delete the websocket instance
     *
     * @method stopWSRecognition
     */
    TextWSRecognizer.prototype.stopWSRecognition = function () {
        this.socket = undefined;
    };

    /**
     * Check if the socket is closed
     *
     * @method isClosed
     * @returns {Boolean}
     */
    TextWSRecognizer.prototype.isClosed = function () {
        return (!this.socket)? true: false;
    };

    /**
     * Create a new socket
     *
     * @method restartWSRecognition
     */
    TextWSRecognizer.prototype.restartWSRecognition = function () {
        var deferred = Q.defer();
        deferred.resolve(this.socket = new WebSocket('ws://' + this.host + '/api/v3.0/recognition/ws/text'));
        return deferred.promise;
    };

    /**
     * @callback TextWSRecognizer~dataCallback
     * @callback TextWSRecognizer~errorCallback
     * @callback TextWSRecognizer~closeCallback
     * @callback TextWSRecognizer~openCallback
     */

        // Export
    scope.TextWSRecognizer = TextWSRecognizer;
})(MyScript, Q);