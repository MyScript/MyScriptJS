(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathInkRange (obj) {
        if (obj) {
            this.component = obj.component;
            this.firstItem = obj.firstItem;
            this.lastItem = obj.lastItem;
        }
    }

    /**
     *
     * @returns {number}
     */
    MathInkRange.prototype.getComponent = function () {
        return this.component;
    };

    /**
     *
     * @returns {number}
     */
    MathInkRange.prototype.getFirstItem = function () {
        return this.firstItem;
    };

    /**
     *
     * @returns {number}
     */
    MathInkRange.prototype.getLastItem = function () {
        return this.lastItem;
    };

    // Export
    scope.MathInkRange = MathInkRange;
})(MyScript);