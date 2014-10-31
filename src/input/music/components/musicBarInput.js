(function (scope) {

    /**
     * Music bar input
     * @constructor
     */
    function MusicBarInput () {
    }

    /**
     * Get repeat direction
     * @returns {String}
     */
    MusicBarInput.prototype.getRepeatDirection = function () {
        return this.repeatDirection;
    };

    /**
     * Set repeat direction
     * @param {String} repeatDirection
     */
    MusicBarInput.prototype.setRepeatDirection = function (repeatDirection) {
        this.repeatDirection = repeatDirection;
    };

    /**
     * Get style
     * @returns {String}
     */
    MusicBarInput.prototype.getStyle = function () {
        return this.style;
    };

    /**
     * Set style
     * @param {String} style
     */
    MusicBarInput.prototype.setStyle = function (style) {
        this.style = style;
    };

    // Export
    scope.MusicBarInput = MusicBarInput;
})(MyScript);