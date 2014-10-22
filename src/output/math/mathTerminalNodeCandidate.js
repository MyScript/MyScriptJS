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
     * @returns {string}
     */
    MathTerminalNodeCandidate.prototype.getLabel = function () {
        return this.label;
    };

    /**
     *
     * @returns {number}
     */
    MathTerminalNodeCandidate.prototype.getNormalizedRecognitionScore = function () {
        return this.normalizedRecognitionScore;
    };

    // Export
    scope.MathTerminalNodeCandidate = MathTerminalNodeCandidate;
})(MyScript);