'use strict';

(function (scope) {
    /**
     * Text tag item
     *
     * @class TextTagItem
     * @param {Object} [obj]
     * @constructor
     */
    function TextTagItem(obj) {
        this.inkRanges = [];
        if (obj) {
            this.tagType = obj.tagType;
            if (obj.inkRanges) {
                var ranges = obj.inkRanges;
                if (!Array.isArray(ranges)) {
                    ranges = ranges.split(/[\s]+/);
                }
                for (var i in ranges) {
                    this.inkRanges.push(new scope.TextInkRange(ranges[i]));
                }
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
     * @returns {TextInkRange[]}
     */
    TextTagItem.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextTagItem = TextTagItem;
})(MyScript);
