(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function ShapeCandidate (obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     *
     * @returns {string}
     */
    ShapeCandidate.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {boolean}
     */
    ShapeCandidate.prototype.isErased = function () {
        return this.type === 'erased';
    };

    /**
     *
     * @returns {boolean}
     */
    ShapeCandidate.prototype.isScratchOut = function () {
        return this.type === 'scratchOut';
    };

    /**
     *
     * @returns {boolean}
     */
    ShapeCandidate.prototype.isNotRecognized = function () {
        return this.type === 'notRecognized';
    };

    /**
     *
     * @returns {boolean}
     */
    ShapeCandidate.prototype.isRecognized = function () {
        return this.type === 'recognizedShape';
    };

    // Export
    scope.ShapeCandidate = ShapeCandidate;
})(MyScript);