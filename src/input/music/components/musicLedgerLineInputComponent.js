(function (scope) {

    /**
     * Ledger line input component
     * @constructor
     */
    function MusicLedgerLineInputComponent () {
        this.type = 'ledgerLine';
    }

    /**
     *
     * @type {MyScript.AbstractMusicInputComponent}
     */
    MusicLedgerLineInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     *
     * @type {MusicLedgerLineInputComponent}
     */
    MusicLedgerLineInputComponent.prototype.constructor = MusicLedgerLineInputComponent;

    /**
     * Get ledger line input component value
     * @returns {String}
     */
    MusicLedgerLineInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set ledger line input component value
     * @param {String} value
     */
    MusicLedgerLineInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicLedgerLineInputComponent = MusicLedgerLineInputComponent;
})(MyScript);