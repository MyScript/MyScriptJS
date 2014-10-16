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
     * @type {Object}
     */
    AnalyzerResult.prototype.__proto__ = new Object();

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