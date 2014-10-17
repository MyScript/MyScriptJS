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