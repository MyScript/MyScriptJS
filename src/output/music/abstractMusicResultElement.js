(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AbstractMusicResultElement (obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     *
     * @returns {string}
     */
    AbstractMusicResultElement.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.AbstractMusicResultElement = AbstractMusicResultElement;
})(MyScript);