(function (scope) {

    /**
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
     * @returns {Array}
     */
    ShapeRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * @param {Array} components
     */
    ShapeRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * @returns {boolean}
     */
    ShapeRecognitionInput.prototype.getDoBeautification = function () {
        return this.doBeautification;
    };

    /**
     * @param {boolean} doBeautification
     */
    ShapeRecognitionInput.prototype.setDoBeautification = function (doBeautification) {
        this.doBeautification = doBeautification;
    };

    /**
     * @returns {number}
     */
    ShapeRecognitionInput.prototype.getRejectDetectionSensitivity = function () {
        return this.rejectDetectionSensitivity;
    };

    /**
     * @param {number} rejectDetectionSensitivity
     */
    ShapeRecognitionInput.prototype.setRejectDetectionSensitivity = function (rejectDetectionSensitivity) {
        this.rejectDetectionSensitivity = rejectDetectionSensitivity;
    };

    // Export
    scope.ShapeRecognitionInput = ShapeRecognitionInput;
})(MyScript);