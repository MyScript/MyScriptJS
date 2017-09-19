'use strict';

(function (scope) {
    /**
     * Shape recognizer interface
     *
     * @class ShapeRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function ShapeRecognizer(host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.ShapeParameter();
    }

    /**
     * Inheritance property
     */
    ShapeRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    ShapeRecognizer.prototype.constructor = ShapeRecognizer;

    /**
     * Do shape recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {ShapeParameter} [parameters]
     * @returns {Promise}
     */
    ShapeRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var input = new scope.ShapeRecognitionInput();
        input.setParameters(params);
        input.setComponents(components);
        return scope.AbstractRecognizer.prototype.doRestRecognition.call(this, input, applicationKey, hmacKey, instanceId); // super
    };

    /**
     * Clear shape recognition session
     *
     * @method clearShapeRecognitionSession
     * @param {String} applicationKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    ShapeRecognizer.prototype.clearShapeRecognitionSession = function (applicationKey, instanceId) {
        return scope.AbstractRecognizer.prototype.clearRestRecognition.call(this, instanceId); // super
    };

    // Export
    scope.ShapeRecognizer = ShapeRecognizer;
})(MyScript);
