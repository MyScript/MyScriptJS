'use strict';

(function (scope) {
    /**
     * Text segment
     *
     * @class TextCharCandidate
     * @extends TextCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function TextCharCandidate (obj) {
        scope.TextCandidate.call(this, obj);
    }

    /**
     * Inheritance property
     */
    TextCharCandidate.prototype = new scope.TextCandidate();

    /**
     * Constructor property
     */
    TextCharCandidate.prototype.constructor = TextCharCandidate;

    // Export
    scope.TextCharCandidate = TextCharCandidate;
})(MyScript);