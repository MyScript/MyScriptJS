(function (scope) {

    /**
     * Bar input component
     * @constructor
     */
    function MusicBarInputComponent () {
        this.type = 'bar';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicBarInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicBarInputComponent}
     */
    MusicBarInputComponent.prototype.constructor = MusicBarInputComponent;

    /**
     * Get bar input component value
     * @returns {MusicBarInput}
     */
    MusicBarInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set bar input component value
     * @param {MusicBarInput} value
     */
    MusicBarInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBarInputComponent = MusicBarInputComponent;
})(MyScript);