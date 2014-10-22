(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicPitchData (obj) {
        if (obj) {
            this.alteration = obj.alteration;
            this.octave = obj.octave;
            this.step = obj.step;
        }
    }

    /**
     *
     * @returns {number}
     */
    MusicPitchData.prototype.getAlteration = function () {
        return this.alteration;
    };

    /**
     *
     * @returns {number}
     */
    MusicPitchData.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     *
     * @returns {string}
     */
    MusicPitchData.prototype.getStep = function () {
        return this.step;
    };

    // Export
    scope.MusicPitchData = MusicPitchData;
})(MyScript);