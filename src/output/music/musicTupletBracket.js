(function (scope) {
    'use strict';
    /**
     * Music tuplet bracket
     *
     * @class MusicTupletBracket
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicTupletBracket (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicTupletBracket.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicTupletBracket.prototype.constructor = MusicTupletBracket;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicTupletBracket.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicTupletBracket = MusicTupletBracket;
})(MyScript);