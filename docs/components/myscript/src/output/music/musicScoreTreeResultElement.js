'use strict';

(function (scope) {
    /**
     * Music score tree
     *
     * @class MusicScoreTreeResultElement
     * @extends MusicResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicScoreTreeResultElement(obj) {
        scope.MusicResultElement.call(this, obj);
        if (obj) {
            this.score = new scope.MusicScore(obj.score);
        }
    }

    /**
     * Inheritance property
     */
    MusicScoreTreeResultElement.prototype = new scope.MusicResultElement();

    /**
     * Constructor property
     */
    MusicScoreTreeResultElement.prototype.constructor = MusicScoreTreeResultElement;

    /**
     * Get score
     *
     * @method getScore
     * @returns {MusicScore}
     */
    MusicScoreTreeResultElement.prototype.getScore = function () {
        return this.score;
    };

    // Export
    scope.MusicScoreTreeResultElement = MusicScoreTreeResultElement;
})(MyScript);