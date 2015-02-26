(function (scope) {
    'use strict';
    /**
     * Text WebSocket recognizer interface
     *
     * @class TextWSRecognizer
     * @extends AbstractWSRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function TextWSRecognizer(host) {
        scope.AbstractWSRecognizer.call(this, host);
        this.socket = new WebSocket('ws://' + this.host + '/api/v3.0/recognition/ws/text');
        var self = this;
        this.socket.onopen = function (message) {
            console.log('WebSocket opened');
            if (self.openCallback) {
                self.openCallback(message);
            }
        };
        this.socket.onmessage = function (message) {
            var data = JSON.parse(message.data);
            console.log('WebSocket message received');
            switch (data.type) {
                case 'init':
                    data = new scope.InitResponseWSMessage(data);
                    break;
                case 'error':
                    data = new scope.ErrorResponseWSMessage(data);
                    break;
                case 'hmacChallenge':
                    data = new scope.ChallengeResponseWSMessage(data);
                    break;
                default:
                    data = new scope.TextResponseWSMessage(data);
                    break;
            }
            if (self.messageCallback) {
                self.messageCallback(data);
            }
        };
        this.socket.onerror = function (message) {
            console.log('WebSocket error received');
            if (self.errorCallback) {
                self.errorCallback(message);
            }
        };
        this.socket.onclose = function (message) {
            console.log('WebSocket opened');
            if (self.closeCallback) {
                self.closeCallback(message);
            }
        };
    }

    /**
     * Inheritance property
     */
    TextWSRecognizer.prototype = new scope.AbstractWSRecognizer();

    /**
     * Constructor property
     */
    TextWSRecognizer.prototype.constructor = TextWSRecognizer;

    /**
     * Start the WebSocket session
     *
     * @method startWSRecognition
     * @param {TextParameter} parameters
     * @param {TextInputUnit[]} inputUnits
     * @returns {Promise}
     */
    TextWSRecognizer.prototype.startWSRecognition = function (parameters, inputUnits) {
        var message = new scope.TextStartRequestWSMessage();
        message.setParameters(parameters);
        message.setInputUnits(inputUnits);
        return this.sendMessage(message);
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {TextInputUnit[]} inputUnits
     * @returns {Promise}
     */
    TextWSRecognizer.prototype.continueWSRecognition = function (inputUnits, instanceId) {
        var message = new scope.TextContinueRequestWSMessage();
        message.setInputUnits(inputUnits);
        message.setInstanceId(instanceId);
        return this.sendMessage(message);
    };

        // Export
    scope.TextWSRecognizer = TextWSRecognizer;
})(MyScript);