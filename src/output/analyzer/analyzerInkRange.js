(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerInkRange (obj) {
        if (obj) {
            this.firstPoint = new scope.AnalyzerPointData(obj.firstPoint);
            this.lastPoint = new scope.AnalyzerPointData(obj.lastPoint);
            this.stroke = new scope.AnalyzerRecognizedStroke(obj.stroke);
        }
    }

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