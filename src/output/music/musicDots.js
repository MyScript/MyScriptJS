'use strict';

(function (scope) {
    /**
     * Music dots
     *
     * @class MusicDots
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicDots(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.count = obj.count;
        }
    }

    /**
     * Inheritance property
     */
    MusicDots.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicDots.prototype.constructor = MusicDots;

    /**
     * Get dots counts
     *
     * @method getCount
     * @returns {Number}
     */
    MusicDots.prototype.getCount = function () {
        return this.count;
    };

    // Export
    scope.MusicDots = MusicDots;
})(MyScript);