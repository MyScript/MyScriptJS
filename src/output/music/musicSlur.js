(function (scope) {

    /**
     * Music slur
     *
     * @class MusicSlur
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicSlur (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.placement = obj.placement;
        }
    }

    /**
     * Inheritance property
     */
    MusicSlur.prototype = new scope.AbstractMusicElement();

    /**
     * Constructor property
     */
    MusicSlur.prototype.constructor = MusicSlur;

    /**
     *
     * @returns {String}
     */
    MusicSlur.prototype.getPlacement = function () {
        return this.placement;
    };

    // Export
    scope.MusicSlur = MusicSlur;
})(MyScript);