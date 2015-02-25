(function (scope) {
    'use strict';
    /**
     * Recognition input object for text recognition
     *
     * @class TextRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function TextRecognitionInput () {
    }

    /**
     * Inheritance property
     */
    TextRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    TextRecognitionInput.prototype.constructor = TextRecognitionInput;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {TextParameter}
     */
    TextRecognitionInput.prototype.getParameters = function () {
        return this.textParameter;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {TextParameter} parameters
     */
    TextRecognitionInput.prototype.setParameters = function (parameters) {
        this.textParameter = parameters;
    };

    /**
     * Get input units
     *
     * @method getInputUnits
     * @returns {TextInputUnit[]}
     */
    TextRecognitionInput.prototype.getInputUnits = function () {
        return this.inputUnits;
    };

    /**
     * Set input units
     *
     * @method setInputUnits
     * @param {TextInputUnit[]} inputUnits
     */
    TextRecognitionInput.prototype.setInputUnits = function (inputUnits) {
        this.inputUnits = inputUnits;
    };

    // Export
    scope.TextRecognitionInput = TextRecognitionInput;
})(MyScript);