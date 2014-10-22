(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathResultElement (obj) {
        if (obj) {
            this.type = obj.type;
            switch (obj.type) {
                case 'SYMBOLTREE':
                    this.value = JSON.stringify(this.root, null, '  ');
                    break;
                default:
                    this.value = obj.value;
                    break;
            }
            this.root = obj.root;
        }
    }

    /**
     *
     * @returns {string}
     */
    MathResultElement.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {boolean}
     */
    MathResultElement.prototype.isLatex = function () {
        return this.type === 'LATEX';
    };

    /**
     *
     * @returns {boolean}
     */
    MathResultElement.prototype.isMathMl = function () {
        return this.type === 'MATHML';
    };

    /**
     *
     * @returns {boolean}
     */
    MathResultElement.prototype.isSymbolTree = function () {
        return this.type === 'SYMBOLTREE';
    };

    /**
     *
     * @returns {string}
     */
    MathResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathResultElement = MathResultElement;
})(MyScript);