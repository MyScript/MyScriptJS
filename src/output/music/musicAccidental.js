(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicAccidental (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicAccidental.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicAccidental}
     */
    MusicAccidental.prototype.constructor = MusicAccidental;

    /**
     *
     * @returns {string}
     */
    MusicAccidental.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicAccidental = MusicAccidental;
})(MyScript);