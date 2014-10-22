(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicInputRange (obj) {
        if (obj) {
            this.component = obj.component;
            this.firstItem = obj.firstItem;
            this.lastItem = obj.lastItem;
        }
    }

    /**
     *
     * @returns {number}
     */
    MusicInputRange.prototype.getComponent = function () {
        return this.component;
    };

    /**
     *
     * @returns {number}
     */
    MusicInputRange.prototype.getFirstItem = function () {
        return this.firstItem;
    };

    /**
     *
     * @returns {number}
     */
    MusicInputRange.prototype.getLastItem = function () {
        return this.lastItem;
    };

    // Export
    scope.MusicInputRange = MusicInputRange;
})(MyScript);