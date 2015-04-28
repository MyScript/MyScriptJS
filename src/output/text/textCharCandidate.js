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

    /**
     * Get glyph
     *
     * @method getGlyph
     * @returns {Glyph}
     */
    TextCharCandidate.prototype.getGlyph = function () {
        return this.glyph;
    };

    /**
     * Set glyph
     *
     * @method setGlyph
     * @param {Glyph} glyph
     */
    TextCharCandidate.prototype.setGlyph = function (glyph) {
        this.glyph = glyph;
    };

    // Export
    scope.TextCharCandidate = TextCharCandidate;
})(MyScript);