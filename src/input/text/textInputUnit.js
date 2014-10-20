(function (scope) {

    /**
     * Input unit used for text recognition
     * @constructor
     */
    function TextInputUnit () {
        this.inputType = 'MULTI_LINE_TEXT';
        this.components = [];
    }

    /**
     * @returns {string}
     */
    TextInputUnit.prototype.getInputType = function () {
        return this.inputType;
    };

    /**
     * @returns {string}
     */
    TextInputUnit.prototype.setInputType = function (inputType) {
        this.inputType = inputType;
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