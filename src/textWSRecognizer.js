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
        this.parameters = {
            language: 'en_US',
            textInputMode: scope.InputMode.CURSIVE,
            textProperties: {}
        };
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
                                callback(message.data);
                                break;
                            case 'reset':
                                callback(message.data);
                                break;
                            case 'error':
                                callback(undefined, new Error(JSON.stringify(message.data.error)));
                                break;
                            case 'hmacChallenge':
                                callback(message.data);
                                break;
                            default:
                                scope.Helper.parseTextResult(message.data.result);
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
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var inputUnits = [];
        if (components && components.length > 0) {
            if (components[0].hasOwnProperty('components')) {
                inputUnits = components;
            } else {
                var unit = {
                    textInputType: 'MULTI_LINE_TEXT',
                    components: components
                };
                inputUnits.push(unit);
            }
        }
        this.sendMessage({
            type: 'start',
            textParameter: params,
            inputUnits: inputUnits
        });
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {AbstractComponent[]|TextInputUnit[]} components
     * @param {String} instanceId
     */
    TextWSRecognizer.prototype.continueWSRecognition = function (components, instanceId) {
        var inputUnits = [];
        if (components && components.length > 0) {
            if (components[0].hasOwnProperty('components')) {
                inputUnits = components;
            } else {
                var unit = {
                    textInputType: 'MULTI_LINE_TEXT',
                    components: components
                };
                inputUnits.push(unit);
            }
        }
        this.sendMessage({
            type: 'continue',
            inputUnits: inputUnits,
            instanceId: instanceId
        });
    };

    // Export
    scope.TextWSRecognizer = TextWSRecognizer;
})(MyScript);
