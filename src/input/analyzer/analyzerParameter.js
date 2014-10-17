(function (scope) {

    /**
     * Parameters used for math recognition
     * @constructor
     */
    function AnalyzerParameter () {
    }

    /**
     *
     * @type {TextParameter}
     */
    AnalyzerParameter.prototype.__proto__ = new scope.TextParameter();

    /**
     *
     * @type {number}
     */
    AnalyzerParameter.prototype.coordinateResolution = 0;

    /**
     *
     * @returns {number}
     */
    AnalyzerParameter.prototype.getCoordinateResolution = function () {
        return this.coordinateResolution;
    };

    // Export
    scope.AnalyzerParameter = AnalyzerParameter;
})(MyScript);