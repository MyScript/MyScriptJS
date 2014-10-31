(function (scope) {

    /**
     *
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
     *
     * @type {MyScript.AbstractMathResultElement}
     */
    MathLaTexResultElement.prototype = new scope.AbstractMathResultElement();

    /**
     *
     * @type {MathLaTexResultElement}
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