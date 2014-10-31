(function (scope) {

    /**
     * Ledger line input component
     *
     * @class MusicLedgerLineInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicLedgerLineInputComponent () {
        this.type = 'ledgerLine';
    }

    /**
     * Inheritance property
     */
    MusicLedgerLineInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
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