(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerResult () {
        this.instanceId = null;
        this.result = null;
    }

    /**
     *
     * @returns {string}
     */
    AnalyzerResult.prototype.getInstanceId = function () {
        return this.instanceId;
    };

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