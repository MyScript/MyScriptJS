(function (scope) {
    'use strict';
    /**
     * Text tag item
     *
     * @class TextTagItem
     * @param {Object} obj
     * @constructor
     */
    function TextTagItem (obj) {
        if (obj) {
            this.tagType = obj.tagType;
            this.inkRanges = obj.inkRanges;
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
     * @returns {String}
     */
    TextTagItem.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextTagItem = TextTagItem;
})(MyScript);