(function (scope) {

    /**
     * Recognition data for math input
     * @constructor
     */
    function MathRecognitionData () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionData}
     */
    MathRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     *
     * @type {MathRecognitionData}
     */
    MathRecognitionData.prototype.constructor = MathRecognitionData;

    /**
     * Get math input
     * @returns {string}
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