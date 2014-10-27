(function (scope) {

    /**
     * String input component
     * @constructor
     */
    function MusicStemInputComponent () {
        this.type = 'stem';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicStemInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicStemInputComponent}
     */
    MusicStemInputComponent.prototype.constructor = MusicStemInputComponent;

    /**
     *
     * @returns {string}
     */
    MusicStemInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {string} value
     */
    MusicStemInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicStemInputComponent = MusicStemInputComponent;
})(MyScript);