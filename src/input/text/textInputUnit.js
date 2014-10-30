(function (scope) {

    /**
     * Input unit used for text recognition
     * @constructor
     */
    function TextInputUnit () {
        this.hwrInputType = 'MULTI_LINE_TEXT';
        this.components = [];
    }

    /**
     * Get the input type
     * @returns {string}
     */
    TextInputUnit.prototype.getInputType = function () {
        return this.hwrInputType;
    };

    /**
     * Set the input type
     * @returns {string} inputType
     */
    TextInputUnit.prototype.setInputType = function (inputType) {
        this.hwrInputType = inputType;
    };

    /**
     * Get components for this input unit
     * @returns {Array}
     */
    TextInputUnit.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set components for this input unit
     * @param {Array} components
     */
    TextInputUnit.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.TextInputUnit = TextInputUnit;
})(MyScript);