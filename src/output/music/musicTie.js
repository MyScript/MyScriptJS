(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicTie (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.placement = obj.placement;
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicTie.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicTie}
     */
    MusicTie.prototype.constructor = MusicTie;

    /**
     *
     * @returns {String}
     */
    MusicTie.prototype.getPlacement = function () {
        return this.placement;
    };

    // Export
    scope.MusicTie = MusicTie;
})(MyScript);