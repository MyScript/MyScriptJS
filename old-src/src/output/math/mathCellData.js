'use strict';

(function (scope) {
    /**
     * Math cell data
     *
     * @class MathCellData
     * @param {Object} [obj]
     * @constructor
     */
    function MathCellData(obj) {
        if (obj) {
            this.columnStart = obj.columnStart;
            this.columnStop = obj.columnStop;
            this.rowStart = obj.rowStart;
            this.rowStop = obj.rowStop;
        }
    }

    /**
     * Get column start
     *
     * @method getColumnStart
     * @returns {Number}
     */
    MathCellData.prototype.getColumnStart = function () {
        return this.columnStart;
    };

    /**
     * Get column stop
     *
     * @method getColumnStop
     * @returns {Number}
     */
    MathCellData.prototype.getColumnStop = function () {
        return this.columnStop;
    };

    /**
     * Get row start
     *
     * @method getRowStart
     * @returns {Number}
     */
    MathCellData.prototype.getRowStart = function () {
        return this.rowStart;
    };

    /**
     * Get row stop
     *
     * @method getRowStop
     * @returns {Number}
     */
    MathCellData.prototype.getRowStop = function () {
        return this.rowStop;
    };

    // Export
    scope.MathCellData = MathCellData;
})(MyScript);
