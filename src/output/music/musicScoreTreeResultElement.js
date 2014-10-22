(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicScoreTreeResultElement (obj) {
        scope.AbstractMusicResultElement.call(this, obj);
        if (obj) {
            this.score = new scope.MusicScore(obj.score);
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicResultElement}
     */
    MusicScoreTreeResultElement.prototype = new scope.AbstractMusicResultElement();

    /**
     *
     * @type {MusicScoreTreeResultElement}
     */
    MusicScoreTreeResultElement.prototype.constructor = MusicScoreTreeResultElement;

    /**
     *
     * @returns {MusicScore}
     */
    MusicScoreTreeResultElement.prototype.getScore = function () {
        return this.score;
    };

    // Export
    scope.MusicScoreTreeResultElement = MusicScoreTreeResultElement;
})(MyScript);