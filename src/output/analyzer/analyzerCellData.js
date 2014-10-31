(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerCellData (obj) {
        if (obj) {
            this.firstColumn = obj.firstColumn;
            this.lastColumn = obj.lastColumn;
            this.firstRow = obj.firstRow;
            this.lastRow = obj.lastRow;
            this.height = obj.height;
            this.width = obj.width;
            this.orientation = obj.orientation;
            this.topLeftPoint = new scope.AnalyzerPointData(obj.topLeftPoint);
            this.topBorder = obj.topBorder;
            this.bottomBorder = obj.bottomBorder;
            this.leftBorder = obj.leftBorder;
            this.rightBorder = obj.rightBorder;
        }
    }

    /**
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getFirstColumn = function () {
        return this.firstColumn;
    };

    /**
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getLastColumn = function () {
        return this.lastColumn;
    };

    /**
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getFirstRow = function () {
        return this.firstRow;
    };

    /**
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getLastRow = function () {
        return this.lastRow;
    };

    /**
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getHeight = function () {
        return this.height;
    };

    /**
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * @returns {String}
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
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasTopBorder = function () {
        return this.topBorder;
    };

    /**
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasBottomBorder = function () {
        return this.bottomBorder;
    };

    /**
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasLeftBorder = function () {
        return this.leftBorder;
    };

    /**
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasRightBorder = function () {
        return this.rightBorder;
    };

    /**
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