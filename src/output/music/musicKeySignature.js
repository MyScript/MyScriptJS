(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicKeySignature (obj) {
        scope.AbstractMusicElement.call(this, obj);
        this.accidentals = [];
        if (obj) {
            this.signature = new scope.MusicKeySignatureData(obj.signature);
            for (var i in obj.accidentals) {
                this.accidentals.push(new scope.MusicAccidental(obj.accidentals[i]));
            }
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicKeySignature.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicKeySignature}
     */
    MusicKeySignature.prototype.constructor = MusicKeySignature;

    /**
     *
     * @returns {MusicKeySignatureData}
     */
    MusicKeySignature.prototype.getSignature = function () {
        return this.signature;
    };

    /**
     *
     * @returns {Array}
     */
    MusicKeySignature.prototype.getAccidentals = function () {
        return this.accidentals;
    };

    // Export
    scope.MusicKeySignature = MusicKeySignature;
})(MyScript);