(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerRecognizedStroke (obj) {
        if (obj) {
            this.type = obj.type;
            this.x = obj.x;
            this.y = obj.y;
        }
    }

    /**
     *
     * @returns {String}
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

    // Export
    scope.AnalyzerRecognizedStroke = AnalyzerRecognizedStroke;
})(MyScript);