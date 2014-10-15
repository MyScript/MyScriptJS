/**
 *
 * @param scope
 */
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
    AnalyzerTableData.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {AnalyzerTableData}
     */
    scope.AnalyzerTableData = AnalyzerTableData;
})(MyScript);