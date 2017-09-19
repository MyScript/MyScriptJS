'use strict';

(function (scope) {
    /**
     * Recognition data for shape input
     *
     * @class ShapeRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function ShapeRecognitionData() {
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
     * @method getRecognitionInput
     * @returns {ShapeRecognitionInput}
     */
    ShapeRecognitionData.prototype.getRecognitionInput = function () {
        return this.shapeInput;
    };

    /**
     * Set shape input
     *
     * @method setRecognitionInput
     * @param {ShapeRecognitionInput} input
     */
    ShapeRecognitionData.prototype.setRecognitionInput = function (input) {
        this.shapeInput = JSON.stringify(input);
    };

    // Export
    scope.ShapeRecognitionData = ShapeRecognitionData;
})(MyScript);
