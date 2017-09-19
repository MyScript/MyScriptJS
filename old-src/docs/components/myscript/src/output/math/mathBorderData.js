'use strict';

(function (scope) {
    /**
     * Math border data
     *
     * @class MathBorderData
     * @param {Object} [obj]
     * @constructor
     */
    function MathBorderData(obj) {
        if (obj) {
            this.position = obj.position;
            this.start = obj.start;
            this.stop = obj.stop;
            this.type = obj.type;
        }
    }

    /**
     * Get position
     *
     * @method getPosition
     * @returns {Number}
     */
    MathBorderData.prototype.getPosition = function () {
        return this.position;
    };

    /**
     * Get start
     *
     * @method getStart
     * @returns {Number}
     */
    MathBorderData.prototype.getStart = function () {
        return this.start;
    };

    /**
     * Get stop
     *
     * @method getStop
     * @returns {Number}
     */
    MathBorderData.prototype.getStop = function () {
        return this.stop;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MathBorderData.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MathBorderData = MathBorderData;
})(MyScript);
