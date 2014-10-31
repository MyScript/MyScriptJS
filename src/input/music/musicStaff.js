(function (scope) {

    /**
     * Represents a staff used for music recognition
     * @constructor
     */
    function MusicStaff () {
    }

    /**
     * Get the count of lines
     * @returns {Number}
     */
    MusicStaff.prototype.getCount = function () {
        return this.count;
    };

    /**
     * Set the count of lines
     * @param {Number}
     */
    MusicStaff.prototype.setCount = function (count) {
        this.count = count;
    };

    /**
     * Get the spacing from the top
     * @returns {Number}
     */
    MusicStaff.prototype.getTop = function () {
        return this.top;
    };

    /**
     * Set the spacing from the top
     * @param {Number}
     */
    MusicStaff.prototype.setTop = function (top) {
        this.top = top;
    };

    /**
     * Get the gap between lines
     * @returns {Number}
     */
    MusicStaff.prototype.getGap = function () {
        return this.gap;
    };

    /**
     * Set the gap between lines
     * @param {Number}
     */
    MusicStaff.prototype.setGap = function (gap) {
        this.gap = gap;
    };

    // Export
    scope.MusicStaff = MusicStaff;
})(MyScript);