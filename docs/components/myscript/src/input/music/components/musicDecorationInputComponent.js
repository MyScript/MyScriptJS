'use strict';

(function (scope) {
    /**
     * Decoration input component
     *
     * @class MusicDecorationInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicDecorationInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'decoration';
        this.value = new scope.MusicDecoration();
        if (obj) {
            if (obj.value) {
                this.value = new scope.MusicDecoration(obj.value);
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicDecorationInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicDecorationInputComponent.prototype.constructor = MusicDecorationInputComponent;

    /**
     * Get decoration input component value
     *
     * @method getValue
     * @returns {MusicDecoration}
     */
    MusicDecorationInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set decoration input component value
     *
     * @method setValue
     * @param {MusicDecoration} value
     */
    MusicDecorationInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicDecorationInputComponent = MusicDecorationInputComponent;
})(MyScript);
