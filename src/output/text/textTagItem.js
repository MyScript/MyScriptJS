(function (scope) {

    /**
     *
     * @constructor
     */
    function TextTagItem () {
        this.tagType = null;
        this.inkRanges = [];
    }

    /**
     *
     * @returns {string}
     */
    TextTagItem.prototype.getTagType = function () {
        return this.tagType;
    };

    /**
     *
     * @returns {Array}
     */
    TextTagItem.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextTagItem = TextTagItem;
})(MyScript);