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
     * @returns {String}
     */
    ShapeCandidate.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isErased = function () {
        return this.type === 'erased';
    };

    /**
     *
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isScratchOut = function () {
        return this.type === 'scratchOut';
    };

    /**
     *
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isNotRecognized = function () {
        return this.type === 'notRecognized';
    };

    /**
     *
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isRecognized = function () {
        return this.type === 'recognizedShape';
    };

    // Export
    scope.ShapeCandidate = ShapeCandidate;
})(MyScript);