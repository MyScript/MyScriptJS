'use strict';

(function (scope) {
    /**
     * Music time modification data
     *
     * @class MusicTimeModificationData
     * @param {Object} [obj]
     * @constructor
     */
    function MusicTimeModificationData(obj) {
        if (obj) {
            this.actual = obj.actual;
            this.dots = obj.dots;
            this.normal = obj.normal;
            this.type = obj.type;
        }
    }

    /**
     * Get actual
     *
     * @method getActual
     * @returns {Number}
     */
    MusicTimeModificationData.prototype.getActual = function () {
        return this.actual;
    };

    /**
     * Get dots
     *
     * @method getDots
     * @returns {Number}
     */
    MusicTimeModificationData.prototype.getDots = function () {
        return this.dots;
    };

    /**
     * Get normal
     *
     * @method getNormal
     * @returns {Number}
     */
    MusicTimeModificationData.prototype.getNormal = function () {
        return this.normal;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicTimeModificationData.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicTimeModificationData = MusicTimeModificationData;
})(MyScript);