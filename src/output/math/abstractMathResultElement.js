(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AbstractMathResultElement (obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     *
     * @returns {String}
     */
    AbstractMathResultElement.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {Boolean}
     */
    AbstractMathResultElement.prototype.isLaTex = function () {
        return this.type === 'LATEX';
    };

    /**
     *
     * @returns {Boolean}
     */
    AbstractMathResultElement.prototype.isMathMl = function () {
        return this.type === 'MATHML';
    };

    /**
     *
     * @returns {Boolean}
     */
    AbstractMathResultElement.prototype.isSymbolTree = function () {
        return this.type === 'SYMBOLTREE';
    };

    // Export
    scope.AbstractMathResultElement = AbstractMathResultElement;
})(MyScript);