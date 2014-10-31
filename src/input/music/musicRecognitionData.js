(function (scope) {

    /**
     * Recognition data for music input
     *
     * @class MusicRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function MusicRecognitionData () {
    }

    /**
     * Inheritance property
     */
    MusicRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    MusicRecognitionData.prototype.constructor = MusicRecognitionData;

    /**
     * Get music input
     *
     * @method getInput
     * @returns {String}
     */
    MusicRecognitionData.prototype.getInput = function () {
        return this.musicInput;
    };

    /**
     * Set music input
     *
     * @method setInput
     * @param {MusicRecognitionInput} input
     */
    MusicRecognitionData.prototype.setInput = function (input) {
        this.musicInput = JSON.stringify(input);
    };

    // Export
    scope.MusicRecognitionData = MusicRecognitionData;
})(MyScript);