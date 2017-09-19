'use strict';

(function (scope) {
    /**
     * Music input range
     *
     * @class MusicInputRange
     * @param {Object} [obj]
     * @constructor
     */
    function MusicInputRange(obj) {
        if (obj) {
            this.component = obj.component;
            this.firstItem = obj.firstItem;
            this.lastItem = obj.lastItem;
        }
    }

    /**
     * Get component
     *
     * @method getComponent
     * @returns {Number}
     */
    MusicInputRange.prototype.getComponent = function () {
        return this.component;
    };

    /**
     * Get first item
     *
     * @method getFirstItem
     * @returns {Number}
     */
    MusicInputRange.prototype.getFirstItem = function () {
        return this.firstItem;
    };

    /**
     * Get last item
     *
     * @method getLastItem
     * @returns {Number}
     */
    MusicInputRange.prototype.getLastItem = function () {
        return this.lastItem;
    };

    // Export
    scope.MusicInputRange = MusicInputRange;
})(MyScript);