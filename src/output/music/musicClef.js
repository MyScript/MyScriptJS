(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicClef (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.line = obj.line;
            this.octave = obj.octave;
            this.symbol = obj.symbol;
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicClef.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicClef}
     */
    MusicClef.prototype.constructor = MusicClef;

    /**
     *
     * @returns {number}
     */
    MusicClef.prototype.getLine = function () {
        return this.line;
    };

    /**
     *
     * @returns {number}
     */
    MusicClef.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     *
     * @returns {string}
     */
    MusicClef.prototype.getSymbol = function () {
        return this.symbol;
    };

    // Export
    scope.MusicClef = MusicClef;
})(MyScript);