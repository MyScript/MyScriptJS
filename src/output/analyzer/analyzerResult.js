(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerResult (obj) {
        this.instanceId = null;
        this.result = null;
        if (obj) {
            this.instanceId = obj.instanceId;
            this.result = new scope.AnalyzerDocument(obj.result);
        }
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