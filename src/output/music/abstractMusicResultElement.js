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

    /**
     *
     * @returns {boolean}
     */
    AbstractMusicResultElement.prototype.isMusicXML = function () {
        return this.type === 'MUSICXML';
    };

    /**
     *
     * @returns {boolean}
     */
    AbstractMusicResultElement.prototype.isScoreTree = function () {
        return this.type === 'SCORETREE';
    };

    // Export
    scope.AbstractMusicResultElement = AbstractMusicResultElement;
})(MyScript);