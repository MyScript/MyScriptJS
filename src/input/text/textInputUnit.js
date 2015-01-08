(function (scope) {

    /**
     * Input unit used for text recognition
     *
     * @class TextInputUnit
     * @constructor
     */
    function TextInputUnit () {
        this.textInputType = 'MULTI_LINE_TEXT';
        this.components = [];
    }

    /**
     * Get the input type
     *
     * @method getInputType
     * @returns {String}
     */
    TextInputUnit.prototype.getInputType = function () {
        return this.textInputType;
    };

    /**
     * Set the input type
     *
     * @method setInputType
     * @returns {String} inputType
     */
    TextInputUnit.prototype.setInputType = function (inputType) {
        this.textInputType = inputType;
    };

    /**
     * Get components for this input unit
     *
     * @method getComponents
     * @returns {MyScript.AbstractComponent[]}
     */
    TextInputUnit.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set components for this input unit
     *
     * @method setComponents
     * @param {MyScript.AbstractComponent[]} components
     */
    TextInputUnit.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.TextInputUnit = TextInputUnit;
})(MyScript);