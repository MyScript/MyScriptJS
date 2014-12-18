(function (scope) {

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
     * @returns {MyScript.TextParameter}
     */
    TextRecognitionInput.prototype.getParameters = function () {
        return this.hwrParameter;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MyScript.TextParameter} parameters
     */
    TextRecognitionInput.prototype.setParameters = function (parameters) {
        this.hwrParameter = parameters;
    };

    /**
     * Get input units
     *
     * @method getInputUnits
     * @returns {MyScript.TextInputUnit[]}
     */
    TextRecognitionInput.prototype.getInputUnits = function () {
        return this.inputUnits;
    };

    /**
     * Set input units
     *
     * @method setInputUnits
     * @param {MyScript.TextInputUnit[]} inputUnits
     */
    TextRecognitionInput.prototype.setInputUnits = function (inputUnits) {
        this.inputUnits = inputUnits;
    };

    /**
     * Get switch to children
     *
     * @method getSwitchToChildren
     * @returns {Boolean}
     */
    TextRecognitionInput.prototype.getSwitchToChildren = function () {
        return this.switchToChildren;
    };

    /**
     * Set switch to children
     *
     * @method setSwitchToChildren
     * @param {Boolean} switchToChildren
     */
    TextRecognitionInput.prototype.setSwitchToChildren = function (switchToChildren) {
        this.switchToChildren = switchToChildren;
    };

    // Export
    scope.TextRecognitionInput = TextRecognitionInput;
})(MyScript);