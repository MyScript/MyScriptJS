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
    AnalyzerUnderline.prototype.__proto__ = new scope.AnalyzerElement();

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