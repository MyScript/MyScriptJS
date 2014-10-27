(function (scope) {

    /**
     * String input component
     * @constructor
     */
    function MusicDecorationInputComponent () {
        this.type = 'decoration';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicDecorationInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicDecorationInputComponent}
     */
    MusicDecorationInputComponent.prototype.constructor = MusicDecorationInputComponent;

    /**
     *
     * @returns {MusicDecorationInput}
     */
    MusicDecorationInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {MusicDecorationInput} value
     */
    MusicDecorationInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicDecorationInputComponent = MusicDecorationInputComponent;
})(MyScript);