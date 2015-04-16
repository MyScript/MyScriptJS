'use strict';

(function (scope) {
    /**
     * Text segment
     *
     * @class TextCharSegment
     * @extends TextSegment
     * @param {Object} [obj]
     * @constructor
     */
    function TextCharSegment(obj) {
        scope.TextSegment.call(this, obj);
        if (obj) {
            for (var i in obj.candidates) {
                this.candidates.push(new scope.TextCharCandidate(obj.candidates[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    TextCharSegment.prototype = new scope.TextSegment();

    /**
     * Constructor property
     */
    TextCharSegment.prototype.constructor = TextCharSegment;

    // Export
    scope.TextCharSegment = TextCharSegment;
})(MyScript);