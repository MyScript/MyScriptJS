(function (scope) {

    /**
     * Text tag item
     *
     * @class TextTagItem
     * @param {Object} obj
     * @constructor
     */
    function TextTagItem (obj) {
        this.inkRanges = [];
        if (obj) {
            this.tagType = obj.tagType;
            for (var i in obj.inkRanges) {
                this.inkRanges.push(obj.inkRanges[i]);
            }
        }
    }

    /**
     * Get tag type
     *
     * @method getTagType
     * @returns {String}
     */
    TextTagItem.prototype.getTagType = function () {
        return this.tagType;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {Array}
     */
    TextTagItem.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextTagItem = TextTagItem;
})(MyScript);