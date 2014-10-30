(function (scope) {

    /**
     * Recognition data for shape input
     * @constructor
     */
    function ShapeRecognitionData () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionData}
     */
    ShapeRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     *
     * @type {ShapeRecognitionData}
     */
    ShapeRecognitionData.prototype.constructor = ShapeRecognitionData;

    /**
     * Get shape input
     * @returns {string}
     */
    ShapeRecognitionData.prototype.getInput = function () {
        return this.shapeInput;
    };

    /**
     * Set shape input
     * @param {ShapeRecognitionInput} input
     */
    ShapeRecognitionData.prototype.setInput = function (input) {
        this.shapeInput = JSON.stringify(input);
    };

    // Export
    scope.ShapeRecognitionData = ShapeRecognitionData;
})(MyScript);