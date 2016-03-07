'use strict';

(function (scope) {
    /**
     * Represents a staff used for music recognition
     * default values: count=5, gap=20
     *
     * @class MusicStaff
     * @constructor
     */
    function MusicStaff(obj) {
        this.count = 5;
        this.gap = 20;
        if (obj) {
            if (obj.count) {
                this.count = obj.count;
            }
            if (obj.gap) {
                this.gap = obj.gap;
            }
            if (obj.top) {
                this.top = obj.top;
            }
        }
    }

    /**
     * Get the lines count
     *
     * @method getCount
     * @returns {Number}
     */
    MusicStaff.prototype.getCount = function () {
        return this.count;
    };

    /**
     * Set the lines count
     *
     * @method setCount
     * @param {Number} count
     */
    MusicStaff.prototype.setCount = function (count) {
        this.count = count;
    };

    /**
     * Get the spacing from the top
     *
     * @method getTop
     * @returns {Number}
     */
    MusicStaff.prototype.getTop = function () {
        return this.top;
    };

    /**
     * Set the spacing from the top
     *
     * @method setTop
     * @param {Number} top
     */
    MusicStaff.prototype.setTop = function (top) {
        this.top = top;
    };

    /**
     * Get the gap between lines
     *
     * @method getGap
     * @returns {Number}
     */
    MusicStaff.prototype.getGap = function () {
        return this.gap;
    };

    /**
     * Set the gap between lines
     *
     * @method setGap
     * @param {Number} gap
     */
    MusicStaff.prototype.setGap = function (gap) {
        this.gap = gap;
    };

    // Export
    scope.MusicStaff = MusicStaff;
})(MyScript);
