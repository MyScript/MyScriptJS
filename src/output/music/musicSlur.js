(function (scope) {

    /**
     *
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
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicSlur.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicSlur}
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