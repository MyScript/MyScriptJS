(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeScratchOut () {
        this.inkRanges = [];
    }

    /**
     *
     * @type {MyScript.ShapeCandidate}
     */
    ShapeScratchOut.prototype = new scope.ShapeCandidate();

    /**
     *
     * @type {ShapeScratchOut}
     */
    ShapeScratchOut.prototype.constructor = ShapeScratchOut;

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