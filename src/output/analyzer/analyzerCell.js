(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerCell (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.data = null;
        if (obj) {
            this.data = new scope.AnalyzerCellData(obj.data);
        }
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