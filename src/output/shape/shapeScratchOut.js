(function (scope) {

    /**
     * Shape scratch-out
     *
     * @class ShapeScratchOut
     * @extends ShapeCandidate
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
     * Inheritance property
     */
    ShapeScratchOut.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeScratchOut.prototype.constructor = ShapeScratchOut;

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {Array}
     */
    ShapeScratchOut.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.ShapeScratchOut = ShapeScratchOut;
})(MyScript);