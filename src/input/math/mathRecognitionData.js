(function (scope) {

    /**
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
     * @returns {string} inputMode
     */
    MathRecognitionData.prototype.getInput = function () {
        return this.inputMode;
    };

    /**
     * @param {MathRecognitionInput} input
     */
    MathRecognitionData.prototype.setInput = function (input) {
        this.equationInput = JSON.stringify(input);
    };

    // Export
    scope.MathRecognitionData = MathRecognitionData;
})(MyScript);