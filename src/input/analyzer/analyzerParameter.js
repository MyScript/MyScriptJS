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
     * @returns {number}
     */
    AnalyzerParameter.prototype.getCoordinateResolution = function () {
        return this.coordinateResolution;
    };

    /**
     *
     * @param {number} coordinateResolution
     */
    AnalyzerParameter.prototype.setCoordinateResolution = function (coordinateResolution) {
        this.coordinateResolution = coordinateResolution;
    };

    // Export
    scope.AnalyzerParameter = AnalyzerParameter;
})(MyScript);