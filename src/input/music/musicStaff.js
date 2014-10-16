(function (scope) {

    /**
     * Represents a staff used for music recognition
     * @constructor
     */
    function MusicStaff () {
    }

    /**
     *
     * @type {Object}
     */
    MusicStaff.prototype.__proto__ = new Object();

    /**
     *
     * @type {number}
     */
    MusicStaff.prototype.count = null;

    /**
     *
     * @type {number}
     */
    MusicStaff.prototype.top = null;

    /**
     *
     * @type {number}
     */
    MusicStaff.prototype.gap = null;

    /**
     *
     */
    MusicStaff.prototype.getCount = function () {
        return this.count;
    };

    /**
     *
     */
    MusicStaff.prototype.getTop = function () {
        return this.top;
    };

    /**
     *
     */
    MusicStaff.prototype.getGap = function () {
        return this.gap;
    };

    // Export
    scope.MusicStaff = MusicStaff;
})(MyScript);