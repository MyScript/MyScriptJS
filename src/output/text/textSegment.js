/**
 *
 * @param scope
 */
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
    TextSegment.prototype = Object.create(Object.prototype);


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

    /**
     *
     * @type {TextSegment}
     */
    scope.TextSegment = TextSegment;
})(MyScript);