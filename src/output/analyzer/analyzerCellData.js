/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerCellData () {
        this.firstColumn = null;
        this.lastColumn = null;
        this.firstRow = null;
        this.lastRow = null;
        this.height = null;
        this.width = null;
        this.orientation = null;
        this.topLeftPoint = null;
        this.topBorder = null;
        this.bottomBorder = null;
        this.leftBorder = null;
        this.rightBorder = null;
    }

    /**
     *
     * @type {Object}
     */
    AnalyzerCellData.prototype = Object.create(Object.prototype);

    /**
     * @returns {number}
     */
    AnalyzerCellData.prototype.getFirstColumn = function () {
        return this.firstColumn;
    };

    /**
     * @returns {number}
     */
    AnalyzerCellData.prototype.getLastColumn = function () {
        return this.lastColumn;
    };

    /**
     * @returns {number}
     */
    AnalyzerCellData.prototype.getFirstRow = function () {
        return this.firstRow;
    };

    /**
     * @returns {number}
     */
    AnalyzerCellData.prototype.getLastRow = function () {
        return this.lastRow;
    };

    /**
     * @returns {number}
     */
    AnalyzerCellData.prototype.getHeight = function () {
        return this.height;
    };

    /**
     * @returns {number}
     */
    AnalyzerCellData.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * @returns {string}
     */
    AnalyzerCellData.prototype.getOrientation = function () {
        return this.orientation;
    };

    /**
     * @returns {AnalyzerPointData}
     */
    AnalyzerCellData.prototype.getTopLeftPoint = function () {
        return this.topLeftPoint;
    };

    /**
     * @returns {boolean}
     */
    AnalyzerCellData.prototype.hasTopBorder = function () {
        return this.topBorder;
    };

    /**
     * @returns {boolean}
     */
    AnalyzerCellData.prototype.hasBottomBorder = function () {
        return this.bottomBorder;
    };

    /**
     * @returns {boolean}
     */
    AnalyzerCellData.prototype.hasLeftBorder = function () {
        return this.leftBorder;
    };

    /**
     * @returns {boolean}
     */
    AnalyzerCellData.prototype.hasRightBorder = function () {
        return this.rightBorder;
    };

    /**
     *
     * @type {AnalyzerCellData}
     */
    scope.AnalyzerCellData = AnalyzerCellData;
})(MyScript);