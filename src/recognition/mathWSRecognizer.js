'use strict';

(function (scope) {
    /**
     * Math WebSocket recognizer interface
     *
     * @class MathWSRecognizer
     * @extends AbstractWSRecognizer
     * @param {Function} callback The WebSocket response callback
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function MathWSRecognizer(callback, host) {
        scope.AbstractWSRecognizer.call(this);
        this.parameters = new scope.MathParameter();
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
    MathWSRecognizer.prototype = new scope.AbstractWSRecognizer();

    /**
     * Constructor property
     */
    MathWSRecognizer.prototype.constructor = MathWSRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MathParameter}
     */
    MathWSRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MathParameter} parameters
     */
    MathWSRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    MathWSRecognizer.prototype.setUrl = function (url) {
        if (url !== undefined) {
            this._wsInterface.setUrl(url + '/api/v3.0/recognition/ws/math');
        }
    };

    MathWSRecognizer.prototype.setCallback = function (callback) {
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
                                message.data = new scope.MathResponseWSMessage(message.data);
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
     * @param {AbstractComponent[]} components
     * @param {MathParameter} [parameters]
     */
    MathWSRecognizer.prototype.startWSRecognition = function (components, parameters) {
        var message = new scope.MathStartRequestWSMessage();
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        message.setParameters(params);
        message.setComponents(components);
        this.sendMessage(message);
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {AbstractComponent[]} components
     * @param {String} instanceId
     */
    MathWSRecognizer.prototype.continueWSRecognition = function (components, instanceId) {
        var message = new scope.MathContinueRequestWSMessage();
        message.setComponents(components);
        message.setInstanceId(instanceId);
        this.sendMessage(message);
    };

    // Export
    scope.MathWSRecognizer = MathWSRecognizer;
})(MyScript);
