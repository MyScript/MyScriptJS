/**
 *
 * @param scope
 */
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
    AnalyzerCell.prototype = Object.create(scope.AnalyzerElement.prototype);

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

    /**
     *
     * @type {AnalyzerCell}
     */
    scope.AnalyzerCell = AnalyzerCell;
})(MyScript);