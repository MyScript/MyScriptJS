(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathDocument (obj) {
        this.results = [];
        if (obj) {
            for (var i in obj.results) {
                switch (obj.results[i].type) {
                    case 'MATHML':
                        this.results.push(new scope.MathMathMLResultElement(obj.results[i]));
                        break;
                    case 'LATEX':
                        this.results.push(new scope.MathLaTexResultElement(obj.results[i]));
                        break;
                    default:
                        this.results.push(new scope.MathSymbolTreeResultElement(obj.results[i]));
                        break;
                }
            }
        }
    }

    /**
     *
     * @returns {Array}
     */
    MathDocument.prototype.getResultElements = function () {
        return this.results;
    };

    // Export
    scope.MathDocument = MathDocument;
})(MyScript);