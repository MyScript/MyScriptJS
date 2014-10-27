(function (scope) {

    /**
     * String input component
     * @constructor
     */
    function MusicClefInputComponent () {
        this.type = 'clef';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicClefInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicClefInputComponent}
     */
    MusicClefInputComponent.prototype.constructor = MusicClefInputComponent;

    /**
     *
     * @returns {MusicClefInput}
     */
    MusicClefInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {MusicClefInput} value
     */
    MusicClefInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicClefInputComponent = MusicClefInputComponent;
})(MyScript);