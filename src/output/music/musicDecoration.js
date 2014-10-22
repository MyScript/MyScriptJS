(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicDecoration (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.symbol = obj.symbol;
            this.placement = obj.placement;
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicDecoration.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicDecoration}
     */
    MusicDecoration.prototype.constructor = MusicDecoration;

    /**
     *
     * @returns {string}
     */
    MusicDecoration.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     *
     * @returns {string}
     */
    MusicDecoration.prototype.getPlacement = function () {
        return this.placement;
    };

    // Export
    scope.MusicDecoration = MusicDecoration;
})(MyScript);