/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerTextLineData () {
        this.baselinePos = null;
        this.toMidline = null;
        this.orientation = null;
        this.topLeftPoint = null;
        this.textHeight = null;
        this.justificationType = null;
        this.height = null;
        this.width = null;
    }

    /**
     *
     * @type {Object}
     */
    AnalyzerTextLineData.prototype = Object.create(Object.prototype);

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
     *
     * @type {AnalyzerTextLineData}
     */
    scope.AnalyzerTextLineData = AnalyzerTextLineData;
})(MyScript);