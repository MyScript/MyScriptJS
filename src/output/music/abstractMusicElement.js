(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AbstractMusicElement (obj) {
        this.inputRanges = [];
        if (obj) {
            this.elementType = obj.elementType;
            this.inputRanges = obj.inputRanges;
        }
    }

    /**
     *
     * @returns {string}
     */
    AbstractMusicElement.prototype.getElementType = function () {
        return this.elementType;
    };

    // Export
    scope.AbstractMusicElement = AbstractMusicElement;
})(MyScript);