(function (scope) {
    'use strict';
    /**
     * Music tie
     *
     * @class MusicTie
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicTie (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.placement = obj.placement;
        }
    }

    /**
     * Inheritance property
     */
    MusicTie.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicTie.prototype.constructor = MusicTie;

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicTie.prototype.getPlacement = function () {
        return this.placement;
    };

    // Export
    scope.MusicTie = MusicTie;
})(MyScript);