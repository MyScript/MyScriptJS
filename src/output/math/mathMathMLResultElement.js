(function (scope) {

    /**
     *
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
     *
     * @type {MyScript.AbstractMathResultElement}
     */
    MathMathMLResultElement.prototype = new scope.AbstractMathResultElement();

    /**
     *
     * @type {MathLaTexResultElement}
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