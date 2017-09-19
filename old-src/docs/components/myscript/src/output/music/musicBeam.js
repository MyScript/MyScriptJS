'use strict';

(function (scope) {
    /**
     * Music beam
     *
     * @class MusicBeam
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicBeam(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.gap = obj.gap;
            this.slope = obj.slope;
            this.placement = obj.placement;
            this.leftCount = obj.leftCount;
            this.rightCount = obj.rightCount;
        }
    }

    /**
     * Inheritance property
     */
    MusicBeam.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicBeam.prototype.constructor = MusicBeam;

    /**
     * Get gap
     *
     * @method getGap
     * @returns {Number}
     */
    MusicBeam.prototype.getGap = function () {
        return this.gap;
    };

    /**
     * Set gap
     *
     * @method setGap
     * @param {Number} gap
     */
    MusicBeam.prototype.setGap = function (gap) {
        this.gap = gap;
    };

    /**
     * Get slope
     *
     * @method getSlope
     * @returns {String}
     */
    MusicBeam.prototype.getSlope = function () {
        return this.slope;
    };

    /**
     * Set slope
     *
     * @method setSlope
     * @param {String} slope
     */
    MusicBeam.prototype.setSlope = function (slope) {
        this.slope = slope;
    };

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicBeam.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Set placement
     *
     * @method setPlacement
     * @param {String} placement
     */
    MusicBeam.prototype.setPlacement = function (placement) {
        this.placement = placement;
    };

    /**
     * Get left count
     *
     * @method getLeftCount
     * @returns {Number}
     */
    MusicBeam.prototype.getLeftCount = function () {
        return this.leftCount;
    };

    /**
     * Set left count
     *
     * @method setLeftCount
     * @param {Number} leftCount
     */
    MusicBeam.prototype.setLeftCount = function (leftCount) {
        this.leftCount = leftCount;
    };

    /**
     * Get right count
     *
     * @method getRightCount
     * @returns {Number}
     */
    MusicBeam.prototype.getRightCount = function () {
        return this.rightCount;
    };

    /**
     * Set right count
     *
     * @method setRightCount
     * @param {Number} rightCount
     */
    MusicBeam.prototype.setRightCount = function (rightCount) {
        this.rightCount = rightCount;
    };


    // Export
    scope.MusicBeam = MusicBeam;
})(MyScript);