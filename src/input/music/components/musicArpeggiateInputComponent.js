(function (scope) {

    /**
     * String input component
     * @constructor
     */
    function MusicArpeggiateInputComponent () {
        this.type = 'arpeggiate';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicArpeggiateInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicArpeggiateInputComponent}
     */
    MusicArpeggiateInputComponent.prototype.constructor = MusicArpeggiateInputComponent;

    /**
     *
     * @returns {string}
     */
    MusicArpeggiateInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {string} value
     */
    MusicArpeggiateInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicArpeggiateInputComponent = MusicArpeggiateInputComponent;
})(MyScript);