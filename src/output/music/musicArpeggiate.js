(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicArpeggiate (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicArpeggiate.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicArpeggiate}
     */
    MusicArpeggiate.prototype.constructor = MusicArpeggiate;

    /**
     *
     * @returns {string}
     */
    MusicArpeggiate.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicArpeggiate = MusicArpeggiate;
})(MyScript);