(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerTextLineData (obj) {
        if (obj) {
            this.baselinePos = obj.baselinePos;
            this.toMidline = obj.toMidline;
            this.orientation = obj.orientation;
            this.topLeftPoint = new scope.AnalyzerPointData(obj.topLeftPoint);
            this.textHeight = obj.textHeight;
            this.justificationType = obj.justificationType;
            this.height = obj.height;
            this.width = obj.width;
        }
    }

    /**
     *
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getBaselinePos = function () {
        return this.baselinePos;
    };

    /**
     *
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getToMidline = function () {
        return this.toMidline;
    };

    /**
     *
     * @returns {String}
     */
    AnalyzerTextLineData.prototype.getOrientation = function () {
        return this.orientation;
    };

    /**
     *
     * @returns {AnalyzerPointData}
     */
    AnalyzerTextLineData.prototype.getTopLeftPoint = function () {
        return this.topLeftPoint;
    };

    /**
     *
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getTextHeight = function () {
        return this.textHeight;
    };

    /**
     *
     * @returns {String}
     */
    AnalyzerTextLineData.prototype.getJustificationType = function () {
        return this.justificationType;
    };

    /**
     *
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getHeight = function () {
        return this.height;
    };

    /**
     *
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * @returns {Rectangle}
     */
    AnalyzerTextLineData.prototype.getBoundingBox = function () {
        var rectangle = new scope.Rectangle();
        rectangle.setTopLeftPoint(this.getTopLeftPoint());
        rectangle.setWidth(this.getWidth());
        rectangle.setHeight(this.getHeight());
        return rectangle;
    };

    // Export
    scope.AnalyzerTextLineData = AnalyzerTextLineData;
})(MyScript);