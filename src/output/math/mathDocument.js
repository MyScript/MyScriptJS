'use strict';

(function (scope) {
    /**
     * Math document
     *
     * @class MathDocument
     * @param {Object} [obj]
     * @constructor
     */
    function MathDocument(obj) {
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
                    case 'OFFICEOPENXMLMATH':
                        this.results.push(new scope.MathOfficeOpenXmlMathResultElement(result));
                        break;
                    default:
                        throw new Error('Unknown math result type: ' + result.type);
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

    /**
     * Has scratch-out results
     *
     * @method hasScratchOutResults
     * @returns {Boolean}
     */
    MathDocument.prototype.hasScratchOutResults = function () {
        if (this.getScratchOutResults() && (this.getScratchOutResults().length > 0)) {
            return true;
        }
        return false;
    };

    // Export
    scope.MathDocument = MathDocument;
})(MyScript);
