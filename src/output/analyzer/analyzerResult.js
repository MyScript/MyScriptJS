/**
 *
 * @param scope
 */
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
    AnalyzerResult.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {AnalyzerResult}
     */
    scope.AnalyzerResult = AnalyzerResult;
})(MyScript);