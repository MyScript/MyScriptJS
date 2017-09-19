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
