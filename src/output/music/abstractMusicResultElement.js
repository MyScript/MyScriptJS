(function (scope) {

    /**
     * Abstract music result element
     *
     * @class AbstractMusicResultElement
     * @param {Object} obj
     * @constructor
     */
    function AbstractMusicResultElement (obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AbstractMusicResultElement.prototype.getType = function () {
        return this.type;
    };

    /**
     * Is MusicXML
     *
     * @method isMusicXML
     * @returns {Boolean}
     */
    AbstractMusicResultElement.prototype.isMusicXML = function () {
        return this.type === 'MUSICXML';
    };

    /**
     * Is ScoreTree
     *
     * @method isScoreTree
     * @returns {Boolean}
     */
    AbstractMusicResultElement.prototype.isScoreTree = function () {
        return this.type === 'SCORETREE';
    };

    // Export
    scope.AbstractMusicResultElement = AbstractMusicResultElement;
})(MyScript);