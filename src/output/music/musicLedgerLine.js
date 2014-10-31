(function (scope) {

    /**
     * Music ledger line
     *
     * @class MusicLedgerLine
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicLedgerLine (obj) {
        scope.AbstractMusicElement.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MusicLedgerLine.prototype = new scope.AbstractMusicElement();

    /**
     * Constructor property
     */
    MusicLedgerLine.prototype.constructor = MusicLedgerLine;

    // Export
    scope.MusicLedgerLine = MusicLedgerLine;
})(MyScript);