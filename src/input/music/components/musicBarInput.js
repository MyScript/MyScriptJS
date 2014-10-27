(function (scope) {

    /**
     * Music bar input
     * @constructor
     */
    function MusicBarInput () {
    }

    /**
     *
     * @returns {string}
     */
    MusicBarInput.prototype.getRepeatDirection = function () {
        return this.repeatDirection;
    };

    /**
     *
     * @param {string} repeatDirection
     */
    MusicBarInput.prototype.setRepeatDirection = function (repeatDirection) {
        this.repeatDirection = repeatDirection;
    };

    /**
     *
     * @returns {string}
     */
    MusicBarInput.prototype.getStyle = function () {
        return this.style;
    };

    /**
     *
     * @param {string} style
     */
    MusicBarInput.prototype.setStyle = function (style) {
        this.style = style;
    };

    // Export
    scope.MusicBarInput = MusicBarInput;
})(MyScript);