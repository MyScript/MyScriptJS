(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicAnnotation (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.label = obj.label;
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicAnnotation.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicAnnotation}
     */
    MusicAnnotation.prototype.constructor = MusicAnnotation;

    /**
     *
     * @returns {string}
     */
    MusicAnnotation.prototype.getLabel = function () {
        return this.label;
    };

    // Export
    scope.MusicAnnotation = MusicAnnotation;
})(MyScript);