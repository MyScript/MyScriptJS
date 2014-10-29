(function (scope) {

    /**
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
     * @returns {string} inputMode
     */
    ShapeRecognitionData.prototype.getInput = function () {
        return this.inputMode;
    };

    /**
     * @param {ShapeRecognitionInput} input
     */
    ShapeRecognitionData.prototype.setInput = function (input) {
        this.shapeInput = JSON.stringify(input);
    };

    // Export
    scope.ShapeRecognitionData = ShapeRecognitionData;
})(MyScript);