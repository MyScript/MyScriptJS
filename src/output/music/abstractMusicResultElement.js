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
     * @returns {String}
     */
    AbstractMusicResultElement.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {Boolean}
     */
    AbstractMusicResultElement.prototype.isMusicXML = function () {
        return this.type === 'MUSICXML';
    };

    /**
     *
     * @returns {Boolean}
     */
    AbstractMusicResultElement.prototype.isScoreTree = function () {
        return this.type === 'SCORETREE';
    };

    // Export
    scope.AbstractMusicResultElement = AbstractMusicResultElement;
})(MyScript);