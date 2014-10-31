(function (scope) {

    /**
     * Music dots
     *
     * @class MusicDots
     * @extends AbstractMusicElement
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
     * Inheritance property
     */
    MusicDots.prototype = new scope.AbstractMusicElement();

    /**
     * Constructor property
     */
    MusicDots.prototype.constructor = MusicDots;

    /**
     *
     * @returns {Number}
     */
    MusicDots.prototype.getCount = function () {
        return this.count;
    };

    // Export
    scope.MusicDots = MusicDots;
})(MyScript);