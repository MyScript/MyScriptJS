(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function ShapeScratchOut (obj) {
        scope.ShapeCandidate.call(this, obj);
        this.inkRanges = [];
        for (var j in obj.inkRanges) {
            this.inkRanges.push(new scope.ShapeInkRange(obj.inkRanges[j]));
        }
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