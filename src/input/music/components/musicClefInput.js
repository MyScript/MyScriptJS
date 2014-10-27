(function (scope) {

    /**
     * Music clef input
     * @constructor
     */
    function MusicClefInput () {
    }

    /**
     *
     * @returns {number}
     */
    MusicClefInput.prototype.getYAnchor = function () {
        return this.yAnchor;
    };

    /**
     *
     * @param {number} yAnchor
     */
    MusicClefInput.prototype.setYAnchor = function (yAnchor) {
        this.yAnchor = yAnchor;
    };

    /**
     *
     * @returns {number}
     */
    MusicClefInput.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     *
     * @param {number} octave
     */
    MusicClefInput.prototype.setOctave = function (octave) {
        this.octave = octave;
    };

    /**
     *
     * @returns {string}
     */
    MusicClefInput.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     *
     * @param {string} symbol
     */
    MusicClefInput.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };

    // Export
    scope.MusicClefInput = MusicClefInput;
})(MyScript);