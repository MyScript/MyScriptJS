(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicHead (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicHead.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicHead}
     */
    MusicHead.prototype.constructor = MusicHead;

    /**
     *
     * @returns {string}
     */
    MusicHead.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicHead = MusicHead;
})(MyScript);