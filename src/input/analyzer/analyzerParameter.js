/**
 *
 * @param scope
 */
(function (scope) {

    /**
     * Parameters used for math recognition
     * @constructor
     */
    function AnalyzerParameter () {
        scope.TextParameter.call(this);
    }

    /**
     *
     * @type {TextParameter}
     */
    AnalyzerParameter.prototype = new scope.TextParameter();

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

    /**
     *
     * @type {AnalyzerParameter}
     */
    scope.AnalyzerParameter = AnalyzerParameter;
})(MyScript);