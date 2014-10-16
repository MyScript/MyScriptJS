/**
 *
 * @param scope
 */
(function (scope) {

    /**
     * Input unit used for shape recognition
     * @constructor
     */
    function TextInputUnit () {
    }

    /**
     *
     * @type {string}
     */
    TextInputUnit.prototype.textInputType = 'MULTI_LINE_TEXT';

    /**
     *
     * @type {Array}
     */
    TextInputUnit.prototype.components = [];

    /**
     *
     */
    TextInputUnit.prototype.getTextInputType = function () {
        return this.textInputType;
    };

    /**
     *
     */
    TextInputUnit.prototype.getComponents = function () {
        return this.components;
    };

    /**
     *
     * @type {TextInputUnit}
     */
    scope.TextInputUnit = TextInputUnit;
})(MyScript);