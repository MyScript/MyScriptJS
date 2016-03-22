'use strict';

(function (scope) {
    /**
     * Recognition input object for shape recognition
     *
     * @class ShapeRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function ShapeRecognitionInput() {
    }

    /**
     * Inheritance property
     */
    ShapeRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    ShapeRecognitionInput.prototype.constructor = ShapeRecognitionInput;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {ShapeParameter}
     */
    ShapeRecognitionInput.prototype.getParameters = function () {
        return new ShapeParameter({
            rejectDetectionSensitivity: this.rejectDetectionSensitivity,
            doBeautification: this.doBeautification,
            userResources: this.userResources
        });
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {ShapeParameter} parameters
     */
    ShapeRecognitionInput.prototype.setParameters = function (parameters) {
        if (parameters) {
            this.rejectDetectionSensitivity = parameters.getRejectDetectionSensitivity();
            this.doBeautification = parameters.hasBeautification();
            this.userResources = parameters.getUserResources();
        }
    };

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {AbstractComponent[]}
     */
    ShapeRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    ShapeRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * Get the beautification
     *
     * @deprecated Use getParameters instead of getDoBeautification
     * @method getDoBeautification
     * @returns {Boolean}
     */
    ShapeRecognitionInput.prototype.getDoBeautification = function () {
        return this.doBeautification;
    };

    /**
     * Set the beautification
     *
     * @deprecated Use setParameters instead of setDoBeautification
     * @method setDoBeautification
     * @param {Boolean} doBeautification
     */
    ShapeRecognitionInput.prototype.setDoBeautification = function (doBeautification) {
        this.doBeautification = doBeautification;
    };

    /**
     * Get the sensitivity of the reject detection
     *
     * @deprecated Use getParameters instead of getRejectDetectionSensitivity
     * @method getRejectDetectionSensitivity
     * @returns {Number}
     */
    ShapeRecognitionInput.prototype.getRejectDetectionSensitivity = function () {
        return this.rejectDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the reject detection
     *
     * @deprecated Use setParameters instead of setRejectDetectionSensitivity
     * @method setRejectDetectionSensitivity
     * @param {Number} rejectDetectionSensitivity
     */
    ShapeRecognitionInput.prototype.setRejectDetectionSensitivity = function (rejectDetectionSensitivity) {
        this.rejectDetectionSensitivity = rejectDetectionSensitivity;
    };

    // Export
    scope.ShapeRecognitionInput = ShapeRecognitionInput;
})(MyScript);
