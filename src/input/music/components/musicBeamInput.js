(function (scope) {

    /**
     * Music beam input
     * @constructor
     */
    function MusicBeamInput () {
    }

    /**
     * Get placement
     * @returns {String}
     */
    MusicBeamInput.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Set placement
     * @param {String} placement
     */
    MusicBeamInput.prototype.setPlacement = function (placement) {
        this.placement = placement;
    };

    /**
     * Get slope
     * @returns {String}
     */
    MusicBeamInput.prototype.getSlope = function () {
        return this.slope;
    };

    /**
     * Set slope
     * @param {String} slope
     */
    MusicBeamInput.prototype.setSlope = function (slope) {
        this.slope = slope;
    };

    /**
     * Get left count
     * @returns {Number}
     */
    MusicBeamInput.prototype.getLeftCount = function () {
        return this.leftCount;
    };

    /**
     * Set left count
     * @param {Number} leftCount
     */
    MusicBeamInput.prototype.setLeftCount = function (leftCount) {
        this.leftCount = leftCount;
    };

    /**
     * Get right count
     * @returns {Number}
     */
    MusicBeamInput.prototype.getRightCount = function () {
        return this.rightCount;
    };

    /**
     * Set right count
     * @param {Number} rightCount
     */
    MusicBeamInput.prototype.setRightCount = function (rightCount) {
        this.rightCount = rightCount;
    };

    /**
     * Get gap
     * @returns {Number}
     */
    MusicBeamInput.prototype.getGap = function () {
        return this.gap;
    };

    /**
     * Set gap
     * @param {Number} gap
     */
    MusicBeamInput.prototype.setGap = function (gap) {
        this.gap = gap;
    };

    // Export
    scope.MusicBeamInput = MusicBeamInput;
})(MyScript);