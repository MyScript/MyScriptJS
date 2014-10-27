(function (scope) {

    /**
     * String input component
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
     *
     * @returns {string}
     */
    MusicTieOrSlurInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {string} value
     */
    MusicTieOrSlurInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicTieOrSlurInputComponent = MusicTieOrSlurInputComponent;
})(MyScript);