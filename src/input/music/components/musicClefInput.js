(function (scope) {

    /**
     * Music clef input
     * @constructor
     */
    function MusicClefInput () {
    }

    /**
     * Get y anchor
     * @returns {Number}
     */
    MusicClefInput.prototype.getYAnchor = function () {
        return this.yAnchor;
    };

    /**
     * Set y anchor
     * @param {Number} yAnchor
     */
    MusicClefInput.prototype.setYAnchor = function (yAnchor) {
        this.yAnchor = yAnchor;
    };

    /**
     * Get octave
     * @returns {Number}
     */
    MusicClefInput.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     * Set octave
     * @param {Number} octave
     */
    MusicClefInput.prototype.setOctave = function (octave) {
        this.octave = octave;
    };

    /**
     * Get symbol
     * @returns {String}
     */
    MusicClefInput.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     * Set symbol
     * @param {String} symbol
     */
    MusicClefInput.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };

    // Export
    scope.MusicClefInput = MusicClefInput;
})(MyScript);