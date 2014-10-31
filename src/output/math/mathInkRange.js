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
     * @returns {Number}
     */
    MathInkRange.prototype.getComponent = function () {
        return this.component;
    };

    /**
     *
     * @returns {Number}
     */
    MathInkRange.prototype.getFirstItem = function () {
        return this.firstItem;
    };

    /**
     *
     * @returns {Number}
     */
    MathInkRange.prototype.getLastItem = function () {
        return this.lastItem;
    };

    // Export
    scope.MathInkRange = MathInkRange;
})(MyScript);