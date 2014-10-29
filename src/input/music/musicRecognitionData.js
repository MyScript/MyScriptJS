(function (scope) {

    /**
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
     * @returns {string} inputMode
     */
    MusicRecognitionData.prototype.getInput = function () {
        return this.inputMode;
    };

    /**
     * @param {MusicRecognitionInput} input
     */
    MusicRecognitionData.prototype.setInput = function (input) {
        this.musicInput = JSON.stringify(input);
    };

    // Export
    scope.MusicRecognitionData = MusicRecognitionData;
})(MyScript);