(function (scope) {

    /**
     * LaTex result element
     *
     * @class MathLaTexResultElement
     * @extends AbstractMathResultElement
     * @param {Object} obj
     * @constructor
     */
    function MathLaTexResultElement (obj) {
        scope.AbstractMathResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }

    /**
     * Inheritance property
     */
    MathLaTexResultElement.prototype = new scope.AbstractMathResultElement();

    /**
     * Constructor property
     */
    MathLaTexResultElement.prototype.constructor = MathLaTexResultElement;

    /**
     *
     * @returns {String}
     */
    MathLaTexResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathLaTexResultElement = MathLaTexResultElement;
})(MyScript);