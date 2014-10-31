(function (scope) {

    /**
     * Abstract music element
     *
     * @class AbstractMusicElement
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
     * Get element type
     *
     * @method getElementType
     * @returns {String}
     */
    AbstractMusicElement.prototype.getElementType = function () {
        return this.elementType;
    };

    // Export
    scope.AbstractMusicElement = AbstractMusicElement;
})(MyScript);