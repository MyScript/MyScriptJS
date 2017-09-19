'use strict';

(function (scope) {
    /**
     * Beam input component
     *
     * @class MusicBeamInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicBeamInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'beam';
        this.value = new scope.MusicBeam();
        if (obj) {
            if (obj.value) {
                this.value = new scope.MusicBeam(obj.value);
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicBeamInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicBeamInputComponent.prototype.constructor = MusicBeamInputComponent;

    /**
     * Get beam input component value
     *
     * @method getValue
     * @returns {MusicBeam}
     */
    MusicBeamInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set beam input component value
     *
     * @method setValue
     * @param {MusicBeam} value
     */
    MusicBeamInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBeamInputComponent = MusicBeamInputComponent;
})(MyScript);
