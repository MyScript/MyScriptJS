(function (scope) {

    /**
     * Represents a staff used for music recognition
     * @constructor
     */
    function MusicStaff () {
    }

    /**
     * @returns {number}
     */
    MusicStaff.prototype.getCount = function () {
        return this.count;
    };

    /**
     * @param {number}
     */
    MusicStaff.prototype.setCount = function (count) {
        this.count = count;
    };

    /**
     * @returns {number}
     */
    MusicStaff.prototype.getTop = function () {
        return this.top;
    };

    /**
     * @param {number}
     */
    MusicStaff.prototype.setTop = function (top) {
        this.top = top;
    };

    /**
     * @returns {number}
     */
    MusicStaff.prototype.getGap = function () {
        return this.gap;
    };

    /**
     * @param {number}
     */
    MusicStaff.prototype.setGap = function (gap) {
        this.gap = gap;
    };

    // Export
    scope.MusicStaff = MusicStaff;
})(MyScript);