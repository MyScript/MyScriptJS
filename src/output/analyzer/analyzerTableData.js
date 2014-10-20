(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerTableData (obj) {
        this.columnCount = null;
        this.rowCount = null;
        if (obj) {
            this.columnCount = obj.columnCount;
            this.rowCount = obj.rowCount;
        }
    }

    /**
     *
     * @returns {number}
     */
    AnalyzerTableData.prototype.getColumnCount = function () {
        return this.columnCount;
    };

    /**
     *
     * @returns {number}
     */
    AnalyzerTableData.prototype.getRowCount = function () {
        return this.rowCount;
    };

    // Export
    scope.AnalyzerTableData = AnalyzerTableData;
})(MyScript);