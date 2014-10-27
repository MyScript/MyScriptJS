(function (scope) {

    /**
     * String input component
     * @constructor
     */
    function MusicBeamInputComponent () {
        this.type = 'beam';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicBeamInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicBeamInputComponent}
     */
    MusicBeamInputComponent.prototype.constructor = MusicBeamInputComponent;

    /**
     *
     * @returns {MusicBeamInput}
     */
    MusicBeamInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {MusicBeamInput} value
     */
    MusicBeamInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBeamInputComponent = MusicBeamInputComponent;
})(MyScript);