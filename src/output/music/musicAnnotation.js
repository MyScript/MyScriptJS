(function (scope) {
    'use strict';
    /**
     * Music annotation
     *
     * @class MusicAnnotation
     * @extends AbstractMusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicAnnotation (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.label = obj.label;
        }
    }

    /**
     * Inheritance property
     */
    MusicAnnotation.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicAnnotation.prototype.constructor = MusicAnnotation;

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    MusicAnnotation.prototype.getLabel = function () {
        return this.label;
    };

    // Export
    scope.MusicAnnotation = MusicAnnotation;
})(MyScript);