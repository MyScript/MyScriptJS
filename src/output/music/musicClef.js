(function (scope) {

    /**
     * Music clef
     *
     * @class MusicClef
     * @extends AbstractMusicElement
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
     * Inheritance property
     */
    MusicClef.prototype = new scope.AbstractMusicElement();

    /**
     * Constructor property
     */
    MusicClef.prototype.constructor = MusicClef;

    /**
     *
     * @returns {Number}
     */
    MusicClef.prototype.getLine = function () {
        return this.line;
    };

    /**
     *
     * @returns {Number}
     */
    MusicClef.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     *
     * @returns {String}
     */
    MusicClef.prototype.getSymbol = function () {
        return this.symbol;
    };

    // Export
    scope.MusicClef = MusicClef;
})(MyScript);