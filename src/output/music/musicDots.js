(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicDots (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.count = obj.count;
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicDots.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicDots}
     */
    MusicDots.prototype.constructor = MusicDots;

    /**
     *
     * @returns {number}
     */
    MusicDots.prototype.getCount = function () {
        return this.count;
    };

    // Export
    scope.MusicDots = MusicDots;
})(MyScript);