(function (scope) {

    /**
     * String input component
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
     *
     * @returns {string}
     */
    MusicTimeSignatureInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {string} value
     */
    MusicTimeSignatureInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicTimeSignatureInputComponent = MusicTimeSignatureInputComponent;
})(MyScript);