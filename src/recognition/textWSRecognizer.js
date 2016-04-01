'use strict';

(function (scope) {
    /**
     * Text WebSocket recognizer interface
     *
     * @class TextWSRecognizer
     * @extends AbstractWSRecognizer
     * @param {Function} callback The WebSocket response callback
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function TextWSRecognizer(callback, host) {
        scope.AbstractWSRecognizer.call(this);
        this.parameters = new scope.TextParameter();
        this.parameters.setLanguage('en_US');
        this.parameters.setInputMode('CURSIVE');
        this.setUrl('wss://cloud.myscript.com');
        if (host) {
            this.setUrl('wss://' + host);
        }
        this.setCallback(callback);
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
     * Get parameters
     *
     * @method getParameters
     * @returns {TextParameter}
     */
    TextWSRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {TextParameter} parameters
     */
    TextWSRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    TextWSRecognizer.prototype.setUrl = function (url) {
        if (url !== undefined) {
            this._wsInterface.setUrl(url + '/api/v3.0/recognition/ws/text');
        }
    };

    TextWSRecognizer.prototype.setCallback = function (callback) {
        if (callback !== undefined) {
            this._wsInterface.setCallback(function (message) {
                switch (message.type) {
                    case 'open':
                        callback(message);
                        break;
                    case 'close':
                        callback(message);
                        break;
                    case 'error':
                        callback(undefined, message);
                        break;
                    default:
                        switch (message.data.type) {
                            case 'init':
                                message.data = new scope.InitResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                            case 'reset':
                                message.data = new scope.ResetResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                            case 'error':
                                message.data = new scope.ErrorResponseWSMessage(message.data);
                                callback(undefined, new Error(JSON.stringify(message.data.getError())));
                                break;
                            case 'hmacChallenge':
                                message.data = new scope.ChallengeResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                            default:
                                message.data = new scope.TextResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                        }
                        break;
                }
            });
        }
    };

    /**
     * Start the WebSocket session
     *
     * @method startWSRecognition
     * @param {TextInputUnit[]} inputUnits
     * @param {TextParameter} [parameters]
     */
    TextWSRecognizer.prototype.startWSRecognition = function (inputUnits, parameters) {
        var message = new scope.TextStartRequestWSMessage();
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        message.setParameters(params);
        message.setInputUnits(inputUnits);
        this.sendMessage(message);
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {TextInputUnit[]} inputUnits
     * @param {String} instanceId
     */
    TextWSRecognizer.prototype.continueWSRecognition = function (inputUnits, instanceId) {
        var message = new scope.TextContinueRequestWSMessage();
        message.setInputUnits(inputUnits);
        message.setInstanceId(instanceId);
        this.sendMessage(message);
    };

    // Export
    scope.TextWSRecognizer = TextWSRecognizer;
})(MyScript);
