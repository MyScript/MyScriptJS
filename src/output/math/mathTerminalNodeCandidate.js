(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathTerminalNodeCandidate (obj) {
        if (obj) {
            this.label = obj.label;
            this.normalizedRecognitionScore = obj.normalizedRecognitionScore;
        }
    }

    /**
     *
     * @returns {String}
     */
    MathTerminalNodeCandidate.prototype.getLabel = function () {
        return this.label;
    };

    /**
     *
     * @returns {Number}
     */
    MathTerminalNodeCandidate.prototype.getNormalizedRecognitionScore = function () {
        return this.normalizedRecognitionScore;
    };

    // Export
    scope.MathTerminalNodeCandidate = MathTerminalNodeCandidate;
})(MyScript);