'use strict';

(function (scope) {
    /**
     * Recognition data for math input
     *
     * @class MathRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function MathRecognitionData() {
    }

    /**
     * Inheritance property
     */
    MathRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    MathRecognitionData.prototype.constructor = MathRecognitionData;

    /**
     * Get math input
     *
     * @deprecated Use getRecognitionInput instead
     * @method getMathRecognitionInput
     * @returns {MathRecognitionInput}
     */
    MathRecognitionData.prototype.getMathRecognitionInput = function () {
        return this.mathInput;
    };

    /**
     * Set math input
     *
     * @deprecated Use setRecognitionInput instead
     * @method setMathRecognitionInput
     * @param {MathRecognitionInput} input
     */
    MathRecognitionData.prototype.setMathRecognitionInput = function (input) {
        this.mathInput = JSON.stringify(input);
    };

    /**
     * Get math input
     *
     * @method getRecognitionInput
     * @returns {MathRecognitionInput}
     */
    MathRecognitionData.prototype.getRecognitionInput = function () {
        return this.mathInput;
    };

    /**
     * Set math input
     *
     * @method setRecognitionInput
     * @param {MathRecognitionInput} input
     */
    MathRecognitionData.prototype.setRecognitionInput = function (input) {
        this.mathInput = JSON.stringify(input);
    };

    // Export
    scope.MathRecognitionData = MathRecognitionData;
})(MyScript);
