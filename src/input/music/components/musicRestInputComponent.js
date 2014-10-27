(function (scope) {

    /**
     * String input component
     * @constructor
     */
    function MusicRestInputComponent () {
        this.type = 'rest';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicRestInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicRestInputComponent}
     */
    MusicRestInputComponent.prototype.constructor = MusicRestInputComponent;

    /**
     *
     * @returns {string}
     */
    MusicRestInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {string} value
     */
    MusicRestInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicRestInputComponent = MusicRestInputComponent;
})(MyScript);