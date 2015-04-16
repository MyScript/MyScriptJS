'use strict';

(function (scope) {
    /**
     * Text segment
     *
     * @class TextResultSegment
     * @extends TextSegment
     * @param {Object} [obj]
     * @constructor
     */
    function TextResultSegment(obj) {
        scope.TextSegment.call(this, obj);
        if (obj) {
            for (var i in obj.candidates) {
                this.candidates.push(new scope.TextResultCandidate(obj.candidates[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    TextResultSegment.prototype = new scope.TextSegment();

    /**
     * Constructor property
     */
    TextResultSegment.prototype.constructor = TextResultSegment;

    // Export
    scope.TextResultSegment = TextResultSegment;
})(MyScript);