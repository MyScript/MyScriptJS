(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.AnalyzerDocument(obj.result);
        }
    }

    /**
     *
     * @type {MyScript.AbstractResult}
     */
    AnalyzerResult.prototype = new scope.AbstractResult();

    /**
     *
     * @type {AnalyzerResult}
     */
    AnalyzerResult.prototype.constructor = AnalyzerResult;

    /**
     *
     * @returns {AnalyzerDocument}
     */
    AnalyzerResult.prototype.getAnalyzerDocument = function () {
        return this.result;
    };

    // Export
    scope.AnalyzerResult = AnalyzerResult;
})(MyScript);