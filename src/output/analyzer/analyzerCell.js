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
     * @type {AnalyzerElement}
     */
    AnalyzerCell.prototype.__proto__ = new scope.AnalyzerElement();

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