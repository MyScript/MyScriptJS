/**
 *
 * @param scope
 */
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
     * @type {AnalyzerElement}
     */
    AnalyzerTextLine.prototype = Object.create(scope.AnalyzerElement.prototype);

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

    /**
     *
     * @type {AnalyzerTextLine}
     */
    scope.AnalyzerTextLine = AnalyzerTextLine;
})(MyScript);