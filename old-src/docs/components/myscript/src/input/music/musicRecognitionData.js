'use strict';

(function (scope) {
    /**
     * Recognition data for music input
     *
     * @class MusicRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function MusicRecognitionData() {
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
     * @method getRecognitionInput
     * @returns {MusicRecognitionInput}
     */
    MusicRecognitionData.prototype.getRecognitionInput = function () {
        return this.musicInput;
    };

    /**
     * Set music input
     *
     * @method setRecognitionInput
     * @param {MusicRecognitionInput} input
     */
    MusicRecognitionData.prototype.setRecognitionInput = function (input) {
        this.musicInput = JSON.stringify(input);
    };

    // Export
    scope.MusicRecognitionData = MusicRecognitionData;
})(MyScript);
