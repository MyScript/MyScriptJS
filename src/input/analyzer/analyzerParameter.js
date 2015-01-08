(function (scope) {

    /**
     * Parameters used for analyzer recognition
     *
     * @class AnalyzerParameter
     * @extends AbstractParameter
     * @constructor
     */
    function AnalyzerParameter () {
    }

    /**
     * Inheritance property
     */
    AnalyzerParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    AnalyzerParameter.prototype.constructor = AnalyzerParameter;

    /**
     * Get text recognition parameters
     *
     * @method getTextParameters
     * @returns {TextParameter}
     */
    AnalyzerParameter.prototype.getTextParameters = function () {
        return this.textParameter;
    };

    /**
     * Set text recognition parameters
     *
     * @method setTextParameters
     * @param {TextParameter} parameters
     */
    AnalyzerParameter.prototype.setTextParameters = function (parameters) {
        this.textParameter = parameters;
    };

    /**
     * Get analyzer coordinate resolution
     *
     * @method getCoordinateResolution
     * @returns {Number}
     */
    AnalyzerParameter.prototype.getCoordinateResolution = function () {
        return this.coordinateResolution;
    };

    /**
     * Set analyzer coordinate resolution
     *
     * @method setCoordinateResolution
     * @param {Number} coordinateResolution
     */
    AnalyzerParameter.prototype.setCoordinateResolution = function (coordinateResolution) {
        this.coordinateResolution = coordinateResolution;
    };

    // Export
    scope.AnalyzerParameter = AnalyzerParameter;
})(MyScript);