(function (scope) {

    /**
     * String input component
     * @constructor
     */
    function MusicHeadInputComponent () {
        this.type = 'head';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicHeadInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicHeadInputComponent}
     */
    MusicHeadInputComponent.prototype.constructor = MusicHeadInputComponent;

    /**
     *
     * @returns {string}
     */
    MusicHeadInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {string} value
     */
    MusicHeadInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicHeadInputComponent = MusicHeadInputComponent;
})(MyScript);