'use strict';

(function (scope) {
    /**
     * Bar input component
     *
     * @class MusicBarInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicBarInputComponent() {
        this.type = 'bar';
        this.value = new scope.MusicBarInput();
    }

    /**
     * Inheritance property
     */
    MusicBarInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicBarInputComponent.prototype.constructor = MusicBarInputComponent;

    /**
     * Get bar input component value
     *
     * @method getValue
     * @returns {MusicBarInput}
     */
    MusicBarInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set bar input component value
     *
     * @method setValue
     * @param {MusicBarInput} value
     */
    MusicBarInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBarInputComponent = MusicBarInputComponent;
})(MyScript);