/**
 *
 * @param scope
 */
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
     * @type {ShapeCandidate}
     */
    ShapeScratchOut.prototype = Object.create(scope.ShapeCandidate.prototype);

    /**
     *
     * @returns {Array}
     */
    ShapeScratchOut.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     *
     * @type {ShapeScratchOut}
     */
    scope.ShapeScratchOut = ShapeScratchOut;
})(MyScript);