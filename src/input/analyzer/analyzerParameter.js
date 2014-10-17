(function (scope) {

    /**
     * Parameters used for math recognition
     * @constructor
     */
    function AnalyzerParameter () {
    }

    /**
     *
     * @type {MyScript.TextParameter}
     */
    AnalyzerParameter.prototype = new scope.TextParameter();

    /**
     *
     * @type {AnalyzerParameter}
     */
    AnalyzerParameter.prototype.constructor = AnalyzerParameter;

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