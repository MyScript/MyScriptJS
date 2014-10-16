(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerInkRange () {
        this.firstPoint = null;
        this.lastPoint = null;
        this.stroke = null;
    }

    /**
     *
     * @type {Object}
     */
    AnalyzerInkRange.prototype.__proto__ = new Object();

    /**
     * @returns {AnalyzerPointData}
     */
    AnalyzerInkRange.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * @returns {AnalyzerPointData}
     */
    AnalyzerInkRange.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    /**
     * @returns {null|*}
     */
    AnalyzerInkRange.prototype.getStroke = function () {
        return this.stroke;
    };

    // Export
    scope.AnalyzerInkRange = AnalyzerInkRange;
})(MyScript);