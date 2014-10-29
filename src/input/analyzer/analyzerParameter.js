(function (scope) {

    /**
     * Parameters used for analyzer recognition
     * @constructor
     */
    function AnalyzerParameter () {
    }

    /**
     *
     * @type {MyScript.AbstractParameter}
     */
    AnalyzerParameter.prototype = new scope.AbstractParameter();

    /**
     *
     * @type {AnalyzerParameter}
     */
    AnalyzerParameter.prototype.constructor = AnalyzerParameter;

    /**
     *
     * @returns {TextParameter}
     */
    AnalyzerParameter.prototype.getTextParameters = function () {
        return this.hwrParameter;
    };

    /**
     *
     * @param {TextParameter} parameters
     */
    AnalyzerParameter.prototype.setTextParameters = function (parameters) {
        this.hwrParameter = parameters;
    };

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