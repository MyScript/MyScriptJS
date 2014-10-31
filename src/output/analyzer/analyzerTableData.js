(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerTableData (obj) {
        if (obj) {
            this.columnCount = obj.columnCount;
            this.rowCount = obj.rowCount;
        }
    }

    /**
     *
     * @returns {Number}
     */
    AnalyzerTableData.prototype.getColumnCount = function () {
        return this.columnCount;
    };

    /**
     *
     * @returns {Number}
     */
    AnalyzerTableData.prototype.getRowCount = function () {
        return this.rowCount;
    };

    // Export
    scope.AnalyzerTableData = AnalyzerTableData;
})(MyScript);