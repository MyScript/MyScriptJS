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
     * @returns {String}
     */
    MathRecognitionData.prototype.getInput = function () {
        return this.equationInput;
    };

    /**
     * Set math input
     * @param {MathRecognitionInput} input
     */
    MathRecognitionData.prototype.setInput = function (input) {
        this.equationInput = JSON.stringify(input);
    };

    // Export
    scope.MathRecognitionData = MathRecognitionData;
})(MyScript);