'use strict';

(function (scope) {
    /**
     * Math WebSocket recognizer interface
     *
     * @class MathWSRecognizer
     * @extends AbstractWSRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function MathWSRecognizer(host) {
        scope.AbstractWSRecognizer.call(this, host);
        this.parameters = new scope.MathParameter();

        this.socket = new WebSocket('ws://' + this.host + '/api/v3.0/recognition/ws/math');
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
                    data = new scope.MathResponseWSMessage(data);
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

    /**
     * Start the WebSocket session
     *
     * @method startWSRecognition
     * @param {AbstractComponent[]} components
     * @param {MathParameter} [parameters]
     * @returns {Promise}
     */
    MathWSRecognizer.prototype.startWSRecognition = function (components, parameters) {
        var message = new scope.MathStartRequestWSMessage();
        if (parameters) {
            message.setParameters(parameters);
        } else {
            message.setParameters(this.getParameters());
        }
        message.setComponents(components);
        return this.sendMessage(message);
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {AbstractComponent[]} components
     * @param {String} instanceId
     * @returns {Promise}
     */
    MathWSRecognizer.prototype.continueWSRecognition = function (components, instanceId) {
        var message = new scope.MathContinueRequestWSMessage();
        message.setComponents(components);
        message.setInstanceId(instanceId);
        return this.sendMessage(message);
    };

    /**
     * Do math WebSocket recognition
     *
     * @method doWSRecognition
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {MathParameter} [parameters]
     * @returns {Promise}
     */
    MathWSRecognizer.prototype.doWSRecognition = function (instanceId, components, parameters) {
        if (!instanceId) {
            return this.startWSRecognition(components, parameters);
        } else {
            return this.continueWSRecognition(components, instanceId);
        }
    };

    // Export
    scope.MathWSRecognizer = MathWSRecognizer;
})(MyScript);