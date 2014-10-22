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
     * @returns {string}
     */
    AbstractMathResultElement.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {boolean}
     */
    AbstractMathResultElement.prototype.isLaTex = function () {
        return this.type === 'LATEX';
    };

    /**
     *
     * @returns {boolean}
     */
    AbstractMathResultElement.prototype.isMathMl = function () {
        return this.type === 'MATHML';
    };

    /**
     *
     * @returns {boolean}
     */
    AbstractMathResultElement.prototype.isSymbolTree = function () {
        return this.type === 'SYMBOLTREE';
    };

    // Export
    scope.AbstractMathResultElement = AbstractMathResultElement;
})(MyScript);