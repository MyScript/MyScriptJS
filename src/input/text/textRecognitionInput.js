(function (scope) {

    /**
     * Recognition input object for text recognition
     * @constructor
     */
    function TextRecognitionInput () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionInput}
     */
    TextRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     *
     * @type {TextRecognitionInput}
     */
    TextRecognitionInput.prototype.constructor = TextRecognitionInput;

    /**
     * @returns {TextParameter}
     */
    TextRecognitionInput.prototype.getParameters = function () {
        return this.hwrParameter;
    };

    /**
     * @param {TextParameter} parameters
     */
    TextRecognitionInput.prototype.setParameters = function (parameters) {
        this.hwrParameter = parameters;
    };

    /**
     * @returns {Array}
     */
    TextRecognitionInput.prototype.getInputUnits = function () {
        return this.inputUnits;
    };

    /**
     * @param {Array} inputUnits
     */
    TextRecognitionInput.prototype.setInputUnits = function (inputUnits) {
        this.inputUnits = inputUnits;
    };

    /**
     * @returns {Boolean}
     */
    TextRecognitionInput.prototype.getSwitchToChildren = function () {
        return this.switchToChildren;
    };

    /**
     * @param {Boolean} switchToChildren
     */
    TextRecognitionInput.prototype.setSwitchToChildren = function (switchToChildren) {
        this.switchToChildren = switchToChildren;
    };

    // Export
    scope.TextRecognitionInput = TextRecognitionInput;
})(MyScript);