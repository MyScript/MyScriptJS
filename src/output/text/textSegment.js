(function (scope) {

    /**
     *
     * @constructor
     */
    function TextSegment () {
        this.candidates = [];
        this.inkRanges = [];
    }


    /**
     *
     * @type {Object}
     */
    TextSegment.prototype.__proto__ = new Object();


    /**
     *
     * @returns {Array}
     */
    TextSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     *
     * @returns {Array}
     */
    TextSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextSegment = TextSegment;
})(MyScript);