(function (scope) {

    /**
     * Time signature input component
     * @constructor
     */
    function MusicTimeSignatureInputComponent () {
        this.type = 'timeSignature';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicTimeSignatureInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicTimeSignatureInputComponent}
     */
    MusicTimeSignatureInputComponent.prototype.constructor = MusicTimeSignatureInputComponent;

    /**
     * Get time signature input component value
     * @returns {String}
     */
    MusicTimeSignatureInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set time signature input component value
     * @param {String} value
     */
    MusicTimeSignatureInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicTimeSignatureInputComponent = MusicTimeSignatureInputComponent;
})(MyScript);