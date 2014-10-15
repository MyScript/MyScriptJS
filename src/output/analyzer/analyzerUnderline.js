/**
 *
 * @param scope
 */
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
     * @type {AnalyzerElement}
     */
    AnalyzerUnderline.prototype = Object.create(scope.AnalyzerElement.prototype);

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

    /**
     *
     * @type {AnalyzerUnderline}
     */
    scope.AnalyzerUnderline = AnalyzerUnderline;
})(MyScript);