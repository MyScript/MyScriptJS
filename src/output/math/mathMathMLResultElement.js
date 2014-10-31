(function (scope) {

    /**
     * MathML result element
     *
     * @class MathMathMLResultElement
     * @extends AbstractMathResultElement
     * @param {Object} obj
     * @constructor
     */
    function MathMathMLResultElement (obj) {
        scope.AbstractMathResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }

    /**
     * Inheritance property
     */
    MathMathMLResultElement.prototype = new scope.AbstractMathResultElement();

    /**
     * Constructor property
     */
    MathMathMLResultElement.prototype.constructor = MathMathMLResultElement;

    /**
     *
     * @returns {String}
     */
    MathMathMLResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathMathMLResultElement = MathMathMLResultElement;
})(MyScript);