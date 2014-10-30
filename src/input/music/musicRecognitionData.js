(function (scope) {

    /**
     * Recognition data for music input
     * @constructor
     */
    function MusicRecognitionData () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionData}
     */
    MusicRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     *
     * @type {MusicRecognitionData}
     */
    MusicRecognitionData.prototype.constructor = MusicRecognitionData;

    /**
     * Get music input
     * @returns {string}
     */
    MusicRecognitionData.prototype.getInput = function () {
        return this.musicInput;
    };

    /**
     * Set music input
     * @param {MusicRecognitionInput} input
     */
    MusicRecognitionData.prototype.setInput = function (input) {
        this.musicInput = JSON.stringify(input);
    };

    // Export
    scope.MusicRecognitionData = MusicRecognitionData;
})(MyScript);