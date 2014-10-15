/**
 *
 * @param scope
 */
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
     * @type {Object}
     */
    TextTagItem.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {TextTagItem}
     */
    scope.TextTagItem = TextTagItem;
})(MyScript);