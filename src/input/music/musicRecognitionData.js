'use strict';

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
     * @method getMusicRecognitionInput
     * @returns {MusicRecognitionInput}
     */
    MusicRecognitionData.prototype.getMusicRecognitionInput = function () {
        return this.musicInput;
    };

    /**
     * Set music input
     *
     * @method setMusicRecognitionInput
     * @param {MusicRecognitionInput} input
     */
    MusicRecognitionData.prototype.setMusicRecognitionInput = function (input) {
        this.musicInput = JSON.stringify(input);
    };

    // Export
    scope.MusicRecognitionData = MusicRecognitionData;
})(MyScript);