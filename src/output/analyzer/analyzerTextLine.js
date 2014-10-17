(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerTextLine () {
        this.data = null;
        this.result = null;
        this.inkRanges = [];
        this.underlineList = [];
    }

    /**
     *
     * @type {MyScript.AnalyzerElement}
     */
    AnalyzerTextLine.prototype = new scope.AnalyzerElement();

    /**
     *
     * @type {AnalyzerTextLine}
     */
    AnalyzerTextLine.prototype.constructor = AnalyzerTextLine;

    /**
     *
     * @returns {AnalyzerTextLineData}
     */
    AnalyzerTextLine.prototype.getData = function () {
        return this.data;
    };

    /**
     *
     * @returns {null|*}
     */
    AnalyzerTextLine.prototype.getResult = function () {
        return this.result;
    };

    /**
     *
     * @returns {Array}
     */
    AnalyzerTextLine.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     *
     * @returns {Array}
     */
    AnalyzerTextLine.prototype.getUnderlineList = function () {
        return this.underlineList;
    };

    // Export
    scope.AnalyzerTextLine = AnalyzerTextLine;
})(MyScript);