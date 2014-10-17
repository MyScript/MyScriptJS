(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerUnderline () {
        this.data = null;
        this.inkRanges = [];
    }

    /**
     *
     * @type {MyScript.AnalyzerElement}
     */
    AnalyzerUnderline.prototype = new scope.AnalyzerElement();

    /**
     *
     * @type {AnalyzerUnderline}
     */
    AnalyzerUnderline.prototype.constructor = AnalyzerUnderline;

    /**
     *
     * @returns {AnalyzerUnderlineData}
     */
    AnalyzerUnderline.prototype.getData = function () {
        return this.data;
    };

    /**
     *
     * @returns {Array}
     */
    AnalyzerUnderline.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.AnalyzerUnderline = AnalyzerUnderline;
})(MyScript);