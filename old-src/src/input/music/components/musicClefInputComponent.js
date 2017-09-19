'use strict';

(function (scope) {
    /**
     * Clef input component
     * default clef values: symbol='G', octave=0
     *
     * @class MusicClefInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicClefInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'clef';
        this.value = new scope.MusicClef();
        if (obj) {
            if (obj.value) {
                this.value = new scope.MusicClef(obj.value);
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicClefInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicClefInputComponent.prototype.constructor = MusicClefInputComponent;

    /**
     * Get clef input component value
     *
     * @method getValue
     * @returns {MusicClef}
     */
    MusicClefInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set clef input component value
     *
     * @method setValue
     * @param {MusicClef} value
     */
    MusicClefInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicClefInputComponent = MusicClefInputComponent;
})(MyScript);
