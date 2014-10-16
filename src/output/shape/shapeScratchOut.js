(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeScratchOut () {
        scope.ShapeCandidate.call(this);
        this.inkRanges = [];
    }

    /**
     *
     * @type {ShapeCandidate}
     */
    ShapeScratchOut.prototype.__proto__ = new scope.ShapeCandidate();

    /**
     *
     * @returns {Array}
     */
    ShapeScratchOut.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.ShapeScratchOut = ShapeScratchOut;
})(MyScript);