'use strict';

(function (scope) {
    /**
     * Math table data
     *
     * @class MathTableData
     * @param {Object} [obj]
     * @constructor
     */
    function MathTableData(obj) {
        if (obj) {
            this.columnCount = obj.columnCount;
            this.rowCount = obj.rowCount;
        }
    }

    /**
     * Get column count
     *
     * @method getColumnCount
     * @returns {Number}
     */
    MathTableData.prototype.getColumnCount = function () {
        return this.columnCount;
    };

    /**
     * Get row count
     *
     * @method getRowCount
     * @returns {Number}
     */
    MathTableData.prototype.getRowCount = function () {
        return this.rowCount;
    };

    // Export
    scope.MathTableData = MathTableData;
})(MyScript);
