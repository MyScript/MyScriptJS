'use strict';

(function (scope) {
    /**
     * Music key signature
     *
     * @class MusicKeySignature
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicKeySignature(obj) {
        scope.MusicElement.call(this, obj);
        this.accidentals = [];
        if (obj) {
            this.signature = new scope.MusicKeySignatureData(obj.signature);
            for (var i in obj.accidentals) {
                this.accidentals.push(new scope.MusicAccidental(obj.accidentals[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicKeySignature.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicKeySignature.prototype.constructor = MusicKeySignature;

    /**
     * Get signature
     *
     * @method getSignature
     * @returns {MusicKeySignatureData}
     */
    MusicKeySignature.prototype.getSignature = function () {
        return this.signature;
    };

    /**
     * Get accidentals
     *
     * @method getAccidentals
     * @returns {MusicAccidental[]}
     */
    MusicKeySignature.prototype.getAccidentals = function () {
        return this.accidentals;
    };

    // Export
    scope.MusicKeySignature = MusicKeySignature;
})(MyScript);