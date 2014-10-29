(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerTable (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.lines = [];
        this.cells = [];
        this.inkRanges = [];
        if (obj) {
            this.data = new scope.AnalyzerTableData(obj.data);
            for (var i in obj.lines) {
                this.lines.push(new scope.AnalyzerLine(obj.lines[i]));
            }
            for (var j in obj.cells) {
                this.cells.push(new scope.AnalyzerCell(obj.cells[j]));
            }
            for (var k in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[k]));
            }
        }
    }

    /**
     *
     * @type {MyScript.AnalyzerElement}
     */
    AnalyzerTable.prototype = new scope.AnalyzerElement();

    /**
     *
     * @type {AnalyzerTable}
     */
    AnalyzerTable.prototype.constructor = AnalyzerTable;

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

    // Export
    scope.AnalyzerTable = AnalyzerTable;
})(MyScript);