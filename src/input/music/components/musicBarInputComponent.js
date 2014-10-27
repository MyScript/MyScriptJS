(function (scope) {

    /**
     * String input component
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
     *
     * @returns {MusicBarInput}
     */
    MusicBarInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {MusicBarInput} value
     */
    MusicBarInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBarInputComponent = MusicBarInputComponent;
})(MyScript);