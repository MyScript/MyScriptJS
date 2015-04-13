'use strict';

(function (scope) {
    /**
     * Math document
     *
     * @class MathDocument
     * @param {Object} [obj]
     * @constructor
     */
    function MathDocument (obj) {
        this.results = [];
        this.scratchOutResults = [];
        if (obj) {
            for (var i in obj.results) {
                var result = obj.results[i];
                switch (result.type) {
                    case 'MATHML':
                        this.results.push(new scope.MathMathMLResultElement(result));
                        break;
                    case 'LATEX':
                        this.results.push(new scope.MathLaTexResultElement(result));
                        break;
                    case 'SYMBOLTREE':
                        this.results.push(new scope.MathSymbolTreeResultElement(result));
                        break;
                    default:
                        throw new Error('Unknown math result type');
                }
            }
            for (var j in obj.scratchOutResults) {
                this.scratchOutResults.push(new scope.MathScratchOut(obj.scratchOutResults[j]));
            }
        }
    }

    /**
     * Get result elements
     *
     * @method getResultElements
     * @returns {MathResultElement[]}
     */
    MathDocument.prototype.getResultElements = function () {
        return this.results;
    };

    /**
     * Get scratch-out results
     *
     * @method getScratchOutResults
     * @returns {MathScratchOut[]}
     */
    MathDocument.prototype.getScratchOutResults = function () {
        return this.scratchOutResults;
    };

    // Export
    scope.MathDocument = MathDocument;
})(MyScript);