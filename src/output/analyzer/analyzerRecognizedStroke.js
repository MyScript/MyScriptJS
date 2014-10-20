(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerRecognizedStroke (obj) {
        this.type = null;
        this.x = null;
        this.y = null;
        if (obj) {
            this.type = obj.type;
            this.x = obj.x;
            this.y = obj.y;
        }
    }

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

    // Export
    scope.AnalyzerRecognizedStroke = AnalyzerRecognizedStroke;
})(MyScript);