(function (scope) {

    /**
     * Recognition data for math input
     *
     * @class MathRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function MathRecognitionData () {
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
     * @method getMathRecognitionInput
     * @returns {MyScript.MathRecognitionInput}
     */
    MathRecognitionData.prototype.getMathRecognitionInput = function () {
        return this.equationInput;
    };

    /**
     * Set math input
     *
     * @method setMathRecognitionInput
     * @param {MyScript.MathRecognitionInput} input
     */
    MathRecognitionData.prototype.setMathRecognitionInput = function (input) {
        this.equationInput = JSON.stringify(input);
    };

    // Export
    scope.MathRecognitionData = MathRecognitionData;
})(MyScript);