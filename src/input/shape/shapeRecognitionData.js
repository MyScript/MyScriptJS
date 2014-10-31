(function (scope) {

    /**
     * Recognition data for shape input
     *
     * @class ShapeRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function ShapeRecognitionData () {
    }

    /**
     * Inheritance property
     */
    ShapeRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    ShapeRecognitionData.prototype.constructor = ShapeRecognitionData;

    /**
     * Get shape input
     *
     * @method getInput
     * @returns {String}
     */
    ShapeRecognitionData.prototype.getInput = function () {
        return this.shapeInput;
    };

    /**
     * Set shape input
     *
     * @method setInput
     * @param {ShapeRecognitionInput} input
     */
    ShapeRecognitionData.prototype.setInput = function (input) {
        this.shapeInput = JSON.stringify(input);
    };

    // Export
    scope.ShapeRecognitionData = ShapeRecognitionData;
})(MyScript);