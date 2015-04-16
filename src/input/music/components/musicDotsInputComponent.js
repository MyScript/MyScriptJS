'use strict';

(function (scope) {
    /**
     * Dots input component
     *
     * @class MusicDotsInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicDotsInputComponent() {
        this.type = 'dots';
    }

    /**
     * Inheritance property
     */
    MusicDotsInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicDotsInputComponent.prototype.constructor = MusicDotsInputComponent;

    /**
     * Get dots input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicDotsInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set dots input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicDotsInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicDotsInputComponent = MusicDotsInputComponent;
})(MyScript);