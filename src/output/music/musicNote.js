(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicNote (obj) {
        scope.AbstractMusicElement.call(this, obj);
        this.decorations = [];
        this.beamTypes = [];
        this.ledgerLines = [];
        this.startSlurs = [];
        this.stopSlurs = [];
        if (obj) {
            this.accidental = new scope.MusicAccidental(obj.accidental);
            this.dots = new scope.MusicDots(obj.dots);
            this.duration = obj.duration;
            this.head = new scope.MusicHead(obj.head);
            this.line = obj.line;
            this.pitch = new scope.MusicPitchData(obj.pitch);
            this.startBeam = new scope.MusicBeam(obj.startBeam);
            this.stopBeam = new scope.MusicBeam(obj.stopBeam);
            this.stem = new scope.MusicStem(obj.stem);
            this.startTie = new scope.MusicTie(obj.startTie);
            this.stopTie = new scope.MusicTie(obj.stopTie);
            this.type = obj.type;
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
            }
            for (var j in obj.beamTypes) {
                this.beamTypes.push(obj.beamTypes[j]);
            }
            for (var k in obj.ledgerLines) {
                this.ledgerLines.push(new scope.MusicLedgerLine(obj.ledgerLines[k]));
            }
            for (var l in obj.startSlurs) {
                this.startSlurs.push(new scope.MusicSlur(obj.startSlurs[l]));
            }
            for (var m in obj.stopSlurs) {
                this.stopSlurs.push(new scope.MusicSlur(obj.stopSlurs[m]));
            }
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicNote.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicNote}
     */
    MusicNote.prototype.constructor = MusicNote;

    /**
     *
     * @returns {MusicAccidental}
     */
    MusicNote.prototype.getAccidental = function () {
        return this.accidental;
    };

    /**
     *
     * @returns {MusicDots}
     */
    MusicNote.prototype.getDots = function () {
        return this.dots;
    };

    /**
     *
     * @returns {Number}
     */
    MusicNote.prototype.getDuration = function () {
        return this.duration;
    };

    /**
     *
     * @returns {MusicHead}
     */
    MusicNote.prototype.getHead = function () {
        return this.head;
    };

    /**
     *
     * @returns {Number}
     */
    MusicNote.prototype.getLine = function () {
        return this.line;
    };

    /**
     *
     * @returns {MusicPitchData}
     */
    MusicNote.prototype.getPitch = function () {
        return this.pitch;
    };

    /**
     *
     * @returns {MusicBeam}
     */
    MusicNote.prototype.getStartBeam = function () {
        return this.startBeam;
    };

    /**
     *
     * @returns {MusicBeam}
     */
    MusicNote.prototype.getStopBeam = function () {
        return this.stopBeam;
    };

    /**
     *
     * @returns {MusicStem}
     */
    MusicNote.prototype.getStem = function () {
        return this.stem;
    };

    /**
     *
     * @returns {MusicTie}
     */
    MusicNote.prototype.getStartTie = function () {
        return this.startTie;
    };

    /**
     *
     * @returns {MusicTie}
     */
    MusicNote.prototype.getStopTie = function () {
        return this.stopTie;
    };

    /**
     *
     * @returns {String}
     */
    MusicNote.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {Array}
     */
    MusicNote.prototype.getDecorations = function () {
        return this.decorations;
    };

    /**
     *
     * @returns {Array}
     */
    MusicNote.prototype.getBeamTypes = function () {
        return this.beamTypes;
    };

    /**
     *
     * @returns {Array}
     */
    MusicNote.prototype.getLedgerLines = function () {
        return this.ledgerLines;
    };

    /**
     *
     * @returns {Array}
     */
    MusicNote.prototype.getStartSlurs = function () {
        return this.startSlurs;
    };

    /**
     *
     * @returns {Array}
     */
    MusicNote.prototype.getStopSlurs = function () {
        return this.stopSlurs;
    };

    // Export
    scope.MusicNote = MusicNote;
})(MyScript);