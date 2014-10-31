(function (scope) {

    /**
     * Recognition input object for shape recognition
     * @constructor
     */
    function ShapeRecognitionInput () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionInput}
     */
    ShapeRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     *
     * @type {ShapeRecognitionInput}
     */
    ShapeRecognitionInput.prototype.constructor = ShapeRecognitionInput;

    /**
     * Get input components
     * @returns {Array}
     */
    ShapeRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     * @param {Array} components
     */
    ShapeRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * Get the beautification
     * @returns {Boolean}
     */
    ShapeRecognitionInput.prototype.getDoBeautification = function () {
        return this.doBeautification;
    };

    /**
     * Set the beautification
     * @param {Boolean} doBeautification
     */
    ShapeRecognitionInput.prototype.setDoBeautification = function (doBeautification) {
        this.doBeautification = doBeautification;
    };

    /**
     * Get the sensitivity of the reject detection
     * @returns {Number}
     */
    ShapeRecognitionInput.prototype.getRejectDetectionSensitivity = function () {
        return this.rejectDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the reject detection
     * @param {Number} rejectDetectionSensitivity
     */
    ShapeRecognitionInput.prototype.setRejectDetectionSensitivity = function (rejectDetectionSensitivity) {
        this.rejectDetectionSensitivity = rejectDetectionSensitivity;
    };

    // Export
    scope.ShapeRecognitionInput = ShapeRecognitionInput;
})(MyScript);