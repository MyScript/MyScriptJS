/**
 *
 * @param scope
 */
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
    MusicStaff.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {MusicStaff}
     */
    scope.MusicStaff = MusicStaff;
})(MyScript);