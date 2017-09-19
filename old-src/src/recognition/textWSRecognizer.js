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
        this.setUrl(this.getProtocol() + 'cloud.myscript.com');
        if (host) {
            this.setUrl(this.getProtocol() + host);
        }
        this.setSSL(true);
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
     * @param {AbstractComponent[]|TextInputUnit[]} components
     * @param {TextParameter} [parameters]
     */
    TextWSRecognizer.prototype.startWSRecognition = function (components, parameters) {
        var message = new scope.TextStartRequestWSMessage();
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var inputUnits = [];
        if (components && components.length > 0) {
            if (components[0] instanceof scope.TextInputUnit) {
                inputUnits = components;
            } else {
                var unit = new scope.TextInputUnit();
                unit.setComponents(components);
                inputUnits.push(unit);
            }
        }
        message.setParameters(params);
        message.setInputUnits(inputUnits);
        this.sendMessage(message);
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {AbstractComponent[]|TextInputUnit[]} components
     * @param {String} instanceId
     */
    TextWSRecognizer.prototype.continueWSRecognition = function (components, instanceId) {
        var message = new scope.TextContinueRequestWSMessage();
        var inputUnits = [];
        if (components && components.length > 0) {
            if (components[0] instanceof scope.TextInputUnit) {
                inputUnits = components;
            } else {
                var unit = new scope.TextInputUnit();
                unit.setComponents(components);
                inputUnits.push(unit);
            }
        }
        message.setInputUnits(inputUnits);
        message.setInstanceId(instanceId);
        this.sendMessage(message);
    };

    // Export
    scope.TextWSRecognizer = TextWSRecognizer;
})(MyScript);
