(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicStem (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicStem.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicStem}
     */
    MusicStem.prototype.constructor = MusicStem;

    /**
     *
     * @returns {String}
     */
    MusicStem.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicStem = MusicStem;
})(MyScript);