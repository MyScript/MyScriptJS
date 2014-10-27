(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathDocument (obj) {
        this.results = [];
        this.scratchOutResults = [];
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
            for (var j in obj.scratchOutResults) {
                this.scratchOutResults.push(new scope.MathScratchOut(obj.scratchOutResults[j]));
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

    /**
     *
     * @returns {Array}
     */
    MathDocument.prototype.getScratchOutResults = function () {
        return this.scratchOutResults;
    };

    // Export
    scope.MathDocument = MathDocument;
})(MyScript);