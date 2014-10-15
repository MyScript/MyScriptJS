/**
 *
 * @param scope
 */
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
     * @type {Object}
     */
    AnalyzerStrokeType.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {AnalyzerStrokeType}
     */
    scope.AnalyzerStrokeType = AnalyzerStrokeType;
})(MyScript);