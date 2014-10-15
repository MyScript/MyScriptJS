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
    }

    /**
     *
     * @type {TextParameter}
     */
    AnalyzerParameter.prototype = Object.create(scope.TextParameter.prototype);

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