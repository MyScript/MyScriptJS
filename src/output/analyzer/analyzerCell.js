(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerCell () {
        this.data = null;
    }

    /**
     *
     * @type {MyScript.AnalyzerElement}
     */
    AnalyzerCell.prototype = new scope.AnalyzerElement();

    /**
     *
     * @type {AnalyzerCell}
     */
    AnalyzerCell.prototype.constructor = AnalyzerCell;

    /**
     * @param data
     */
    AnalyzerCell.prototype.setData = function (data) {
        this.data = data;
    };

    /**
     * @returns {AnalyzerCellData}
     */
    AnalyzerCell.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.AnalyzerCell = AnalyzerCell;
})(MyScript);