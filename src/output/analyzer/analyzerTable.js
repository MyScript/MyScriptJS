/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerTable () {
        this.data = null;
        this.lines = [];
        this.cells = [];
        this.inkRanges = [];
    }

    /**
     *
     * @type {AnalyzerElement}
     */
    AnalyzerTable.prototype = Object.create(scope.AnalyzerElement.prototype);

    /**
     *
     * @returns {AnalyzerTableData}
     */
    AnalyzerTable.prototype.getData = function () {
        return this.data;
    };
    /**
     *
     * @returns {Array}
     */
    AnalyzerTable.prototype.getLines = function () {
        return this.lines;
    };

    /**
     *
     * @returns {Array}
     */
    AnalyzerTable.prototype.getCells = function () {
        return this.cells;
    };

    /**
     *
     * @returns {Array}
     */
    AnalyzerTable.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     *
     * @type {AnalyzerTable}
     */
    scope.AnalyzerTable = AnalyzerTable;
})(MyScript);