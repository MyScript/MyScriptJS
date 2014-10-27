(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathScratchOut (obj) {
        this.inkRanges = [];
        this.erasedInkRanges = [];
        if (obj) {
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.MathInkRange(obj.inkRanges[i]));
            }
            for (var j in obj.erasedInkRanges) {
                this.erasedInkRanges.push(new scope.MathInkRange(obj.erasedInkRanges[j]));
            }
        }
    }

    /**
     *
     * @returns {Array}
     */
    MathScratchOut.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     *
     * @returns {Array}
     */
    MathScratchOut.prototype.getErasedInkRanges = function () {
        return this.erasedInkRanges;
    };

    // Export
    scope.MathScratchOut = MathScratchOut;
})(MyScript);