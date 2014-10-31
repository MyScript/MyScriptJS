(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerStrokeType (obj) {
        if (obj) {
            this.inkRange = new scope.AnalyzerInkRange(obj.inkRange);
            this.type = obj.type;
        }
    }

    /**
     *
     * @returns {AnalyzerInkRange}
     */
    AnalyzerStrokeType.prototype.getInkRange = function () {
        return this.inkRange;
    };

    /**
     *
     * @returns {String}
     */
    AnalyzerStrokeType.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.AnalyzerStrokeType = AnalyzerStrokeType;
})(MyScript);