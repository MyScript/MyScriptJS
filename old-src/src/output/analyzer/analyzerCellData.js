'use strict';

(function (scope) {
    /**
     * Analyzer cell data
     *
     * @class AnalyzerCellData
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerCellData(obj) {
        if (obj) {
            this.firstColumn = obj.firstColumn;
            this.lastColumn = obj.lastColumn;
            this.firstRow = obj.firstRow;
            this.lastRow = obj.lastRow;
            this.height = obj.height;
            this.width = obj.width;
            this.orientation = obj.orientation;
            this.topLeftPoint = new scope.Point(obj.topLeftPoint);
            this.topBorder = obj.topBorder;
            this.bottomBorder = obj.bottomBorder;
            this.leftBorder = obj.leftBorder;
            this.rightBorder = obj.rightBorder;
        }
    }

    /**
     * Get first column
     *
     * @method getFirstColumn
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getFirstColumn = function () {
        return this.firstColumn;
    };

    /**
     * Get last column
     *
     * @method getLastColumn
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getLastColumn = function () {
        return this.lastColumn;
    };

    /**
     * Get first row
     *
     * @method getFirstRow
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getFirstRow = function () {
        return this.firstRow;
    };

    /**
     * Get last row
     *
     * @method getLastRow
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getLastRow = function () {
        return this.lastRow;
    };

    /**
     * Get height
     *
     * @method getHeight
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getHeight = function () {
        return this.height;
    };

    /**
     * Get width
     *
     * @method getWidth
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Get orientation
     *
     * @method getOrientation
     * @returns {String}
     */
    AnalyzerCellData.prototype.getOrientation = function () {
        return this.orientation;
    };

    /**
     * Get top-left point
     *
     * @method getTopLeftPoint
     * @returns {Point}
     */
    AnalyzerCellData.prototype.getTopLeftPoint = function () {
        return this.topLeftPoint;
    };

    /**
     * Has top border
     *
     * @method hasTopBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasTopBorder = function () {
        return this.topBorder;
    };

    /**
     * Has bottom border
     *
     * @method hasBottomBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasBottomBorder = function () {
        return this.bottomBorder;
    };

    /**
     * Has left border
     *
     * @method hasLeftBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasLeftBorder = function () {
        return this.leftBorder;
    };

    /**
     * Has right border
     *
     * @method hasRightBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasRightBorder = function () {
        return this.rightBorder;
    };

    /**
     * Get bounding box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    AnalyzerCellData.prototype.getBoundingBox = function () {
        var rectangle = new scope.Rectangle();
        rectangle.setTopLeftPoint(this.getTopLeftPoint());
        rectangle.setWidth(this.getWidth());
        rectangle.setHeight(this.getHeight());
        return rectangle;
    };

    // Export
    scope.AnalyzerCellData = AnalyzerCellData;
})(MyScript);