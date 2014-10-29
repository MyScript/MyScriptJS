(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerTextLineData (obj) {
        this.baselinePos = null;
        this.toMidline = null;
        this.orientation = null;
        this.topLeftPoint = null;
        this.textHeight = null;
        this.justificationType = null;
        this.height = null;
        this.width = null;
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
     * @returns {number}
     */
    AnalyzerTextLineData.prototype.getBaselinePos = function () {
        return this.baselinePos;
    };

    /**
     *
     * @returns {number}
     */
    AnalyzerTextLineData.prototype.getToMidline = function () {
        return this.toMidline;
    };

    /**
     *
     * @returns {string}
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
     * @returns {number}
     */
    AnalyzerTextLineData.prototype.getTextHeight = function () {
        return this.textHeight;
    };

    /**
     *
     * @returns {string}
     */
    AnalyzerTextLineData.prototype.getJustificationType = function () {
        return this.justificationType;
    };

    /**
     *
     * @returns {number}
     */
    AnalyzerTextLineData.prototype.getHeight = function () {
        return this.height;
    };

    /**
     *
     * @returns {number}
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