'use strict';

(function (scope) {
    /**
     * Text segment
     *
     * @class TextWordSegment
     * @extends TextSegment
     * @param {Object} [obj]
     * @constructor
     */
    function TextWordSegment(obj) {
        scope.TextSegment.call(this, obj);
        if (obj) {
            for (var i in obj.candidates) {
                this.candidates.push(new scope.TextWordCandidate(obj.candidates[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    TextWordSegment.prototype = new scope.TextSegment();

    /**
     * Constructor property
     */
    TextWordSegment.prototype.constructor = TextWordSegment;

    // Export
    scope.TextWordSegment = TextWordSegment;
})(MyScript);