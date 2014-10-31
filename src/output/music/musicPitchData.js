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
     * @returns {Number}
     */
    MusicPitchData.prototype.getAlteration = function () {
        return this.alteration;
    };

    /**
     *
     * @returns {Number}
     */
    MusicPitchData.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     *
     * @returns {String}
     */
    MusicPitchData.prototype.getStep = function () {
        return this.step;
    };

    // Export
    scope.MusicPitchData = MusicPitchData;
})(MyScript);