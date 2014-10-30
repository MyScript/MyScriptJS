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
     * Get text recognition parameters
     * @returns {TextParameter}
     */
    AnalyzerParameter.prototype.getTextParameters = function () {
        return this.hwrParameter;
    };

    /**
     * Set text recognition parameters
     * @param {TextParameter} parameters
     */
    AnalyzerParameter.prototype.setTextParameters = function (parameters) {
        this.hwrParameter = parameters;
    };

    /**
     * Get analyzer coordinate resolution
     * @returns {number}
     */
    AnalyzerParameter.prototype.getCoordinateResolution = function () {
        return this.coordinateResolution;
    };

    /**
     * Set analyzer coordinate resolution
     * @param {number} coordinateResolution
     */
    AnalyzerParameter.prototype.setCoordinateResolution = function (coordinateResolution) {
        this.coordinateResolution = coordinateResolution;
    };

    // Export
    scope.AnalyzerParameter = AnalyzerParameter;
})(MyScript);