(function (scope) {

    /**
     * Clef input component
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
     * Get clef input component value
     * @returns {MusicClefInput}
     */
    MusicClefInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set clef input component value
     * @param {MusicClefInput} value
     */
    MusicClefInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicClefInputComponent = MusicClefInputComponent;
})(MyScript);