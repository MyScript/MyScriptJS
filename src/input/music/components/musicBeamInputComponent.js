(function (scope) {

    /**
     * Beam input component
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
     * Get beam input component value
     * @returns {MusicBeamInput}
     */
    MusicBeamInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set beam input component value
     * @param {MusicBeamInput} value
     */
    MusicBeamInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBeamInputComponent = MusicBeamInputComponent;
})(MyScript);