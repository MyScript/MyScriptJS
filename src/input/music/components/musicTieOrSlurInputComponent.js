(function (scope) {

    /**
     * Tie ro slur input component
     * @constructor
     */
    function MusicTieOrSlurInputComponent () {
        this.type = 'tieOrSlur';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicTieOrSlurInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicTieOrSlurInputComponent}
     */
    MusicTieOrSlurInputComponent.prototype.constructor = MusicTieOrSlurInputComponent;

    /**
     * Get tie or slur input component value
     * @returns {String}
     */
    MusicTieOrSlurInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set tie or slur input component value
     * @param {String} value
     */
    MusicTieOrSlurInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicTieOrSlurInputComponent = MusicTieOrSlurInputComponent;
})(MyScript);