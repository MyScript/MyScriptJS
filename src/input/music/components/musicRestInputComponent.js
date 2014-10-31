(function (scope) {

    /**
     * Rest input component
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
     * Get rest input component value
     * @returns {String}
     */
    MusicRestInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set rest input component value
     * @param {String} value
     */
    MusicRestInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicRestInputComponent = MusicRestInputComponent;
})(MyScript);