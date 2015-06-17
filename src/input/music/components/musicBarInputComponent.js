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
        this.value = new scope.MusicBar();
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
     * Get bar component value
     *
     * @method getValue
     * @returns {MusicBar}
     */
    MusicBarInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set bar component value
     *
     * @method setValue
     * @param {MusicBar} value
     */
    MusicBarInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBarInputComponent = MusicBarInputComponent;
})(MyScript);