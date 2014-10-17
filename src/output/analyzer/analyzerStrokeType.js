(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerStrokeType () {
        this.inkRange = null;
        this.type = null;
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
     * @returns {string}
     */
    AnalyzerStrokeType.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.AnalyzerStrokeType = AnalyzerStrokeType;
})(MyScript);