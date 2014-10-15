/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerRecognizedStroke () {
        this.type = null;
        this.x = null;
        this.y = null;
    }

    /**
     *
     * @type {Object}
     */
    AnalyzerRecognizedStroke.prototype = Object.create(Object.prototype);

    /**
     *
     * @returns {string}
     */
    AnalyzerRecognizedStroke.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {Array}
     */
    AnalyzerRecognizedStroke.prototype.getX = function () {
        return this.x;
    };

    /**
     *
     * @returns {Array}
     */
    AnalyzerRecognizedStroke.prototype.getY = function () {
        return this.y;
    };

    /**
     *
     * @type {AnalyzerRecognizedStroke}
     */
    scope.AnalyzerRecognizedStroke = AnalyzerRecognizedStroke;
})(MyScript);