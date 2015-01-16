(function (scope) {
    'use strict';
    /**
     * Music arpeggiate
     *
     * @class MusicArpeggiate
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicArpeggiate (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicArpeggiate.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicArpeggiate.prototype.constructor = MusicArpeggiate;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicArpeggiate.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicArpeggiate = MusicArpeggiate;
})(MyScript);