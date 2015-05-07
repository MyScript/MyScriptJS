'use strict';

(function (scope) {
    /**
     * Music rest
     *
     * @class MusicRest
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicRest(obj) {
        scope.MusicElement.call(this, obj);
        this.decorations = [];
        this.startSlurs = [];
        this.stopSlurs = [];
        if (obj) {
            this.type = obj.type;
            this.dots = new scope.MusicDots(obj.dots);
            this.startTuplet = new scope.MusicTuplet(obj.startTuplet);
            this.stopTuplet = new scope.MusicTuplet(obj.stopTuplet);
            this.timeModification = new scope.MusicTimeModificationData(obj.timeModification);
            this.duration = obj.duration;
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
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
     * Inheritance property
     */
    MusicRest.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicRest.prototype.constructor = MusicRest;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicRest.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get dots
     *
     * @method getDots
     * @returns {MusicDots}
     */
    MusicRest.prototype.getDots = function () {
        return this.dots;
    };

    /**
     * Get start tuplet
     *
     * @method getStartTuplet
     * @returns {MusicTuplet}
     */
    MusicRest.prototype.getStartTuplet = function () {
        return this.startTuplet;
    };

    /**
     * Get stop tuplet
     *
     * @method getStopTuplet
     * @returns {MusicTuplet}
     */
    MusicRest.prototype.getStopTuplet = function () {
        return this.stopTuplet;
    };

    /**
     * Get time modification
     *
     * @method getTimeModification
     * @returns {MusicTimeModificationData}
     */
    MusicRest.prototype.getTimeModification = function () {
        return this.timeModification;
    };

    /**
     * Get duration
     *
     * @method getDuration
     * @returns {Number}
     */
    MusicRest.prototype.getDuration = function () {
        return this.duration;
    };

    /**
     * Get decorations
     *
     * @method getDecorations
     * @returns {MusicDecoration[]}
     */
    MusicRest.prototype.getDecorations = function () {
        return this.decorations;
    };

    /**
     * Get start slurs
     *
     * @method getStartSlurs
     * @returns {MusicSlur[]}
     */
    MusicRest.prototype.getStartSlurs = function () {
        return this.startSlurs;
    };

    /**
     * Get stop slurs
     *
     * @method getStopSlurs
     * @returns {MusicSlur[]}
     */
    MusicRest.prototype.getStopSlurs = function () {
        return this.stopSlurs;
    };

    // Export
    scope.MusicRest = MusicRest;
})(MyScript);