(function (scope) {

    /**
     * Dots input component
     * @constructor
     */
    function MusicDotsInputComponent () {
        this.type = 'dots';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicDotsInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicDotsInputComponent}
     */
    MusicDotsInputComponent.prototype.constructor = MusicDotsInputComponent;

    /**
     * Get dots input component value
     * @returns {string}
     */
    MusicDotsInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set dots input component value
     * @param {string} value
     */
    MusicDotsInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicDotsInputComponent = MusicDotsInputComponent;
})(MyScript);