(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicLedgerLine (obj) {
        scope.AbstractMusicElement.call(this, obj);
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicLedgerLine.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicLedgerLine}
     */
    MusicLedgerLine.prototype.constructor = MusicLedgerLine;

    // Export
    scope.MusicLedgerLine = MusicLedgerLine;
})(MyScript);