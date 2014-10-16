(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerTableData () {
        this.columnCount = null;
        this.rowCount = null;
    }

    /**
     *
     * @type {Object}
     */
    AnalyzerTableData.prototype.__proto__ = new Object();

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