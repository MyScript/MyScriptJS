(function (scope) {

    /**
     *
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