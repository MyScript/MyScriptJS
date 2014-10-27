(function (scope) {

    /**
     * Music beam input
     * @constructor
     */
    function MusicBeamInput () {
    }

    /**
     *
     * @returns {string}
     */
    MusicBeamInput.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     *
     * @param {string} placement
     */
    MusicBeamInput.prototype.setPlacement = function (placement) {
        this.placement = placement;
    };

    /**
     *
     * @returns {string}
     */
    MusicBeamInput.prototype.getSlope = function () {
        return this.slope;
    };

    /**
     *
     * @param {string} slope
     */
    MusicBeamInput.prototype.setSlope = function (slope) {
        this.slope = slope;
    };

    /**
     *
     * @returns {number}
     */
    MusicBeamInput.prototype.getLeftCount = function () {
        return this.leftCount;
    };

    /**
     *
     * @param {number} leftCount
     */
    MusicBeamInput.prototype.setLeftCount = function (leftCount) {
        this.leftCount = leftCount;
    };

    /**
     *
     * @returns {number}
     */
    MusicBeamInput.prototype.getRightCount = function () {
        return this.rightCount;
    };

    /**
     *
     * @param {number} rightCount
     */
    MusicBeamInput.prototype.setRightCount = function (rightCount) {
        this.rightCount = rightCount;
    };

    /**
     *
     * @returns {number}
     */
    MusicBeamInput.prototype.getGap = function () {
        return this.gap;
    };

    /**
     *
     * @param {number} gap
     */
    MusicBeamInput.prototype.setGap = function (gap) {
        this.gap = gap;
    };

    // Export
    scope.MusicBeamInput = MusicBeamInput;
})(MyScript);