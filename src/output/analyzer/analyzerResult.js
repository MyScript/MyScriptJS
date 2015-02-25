(function (scope) {
    'use strict';
    /**
     * Analyzer result
     *
     * @class AnalyzerResult
     * @extends AbstractResult
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.AnalyzerDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    AnalyzerResult.prototype.constructor = AnalyzerResult;

    /**
     * Get analyzer document
     *
     * @method getAnalyzerDocument
     * @returns {AnalyzerDocument}
     */
    AnalyzerResult.prototype.getAnalyzerDocument = function () {
        return this.result;
    };

    // Export
    scope.AnalyzerResult = AnalyzerResult;
})(MyScript);