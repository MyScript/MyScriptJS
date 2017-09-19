'use strict';

(function (scope) {
    /**
     * Music stem
     *
     * @class MusicStem
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicStem(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicStem.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicStem.prototype.constructor = MusicStem;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicStem.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicStem = MusicStem;
})(MyScript);