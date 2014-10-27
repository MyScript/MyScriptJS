(function (scope) {

    /**
     * String input component
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
     *
     * @returns {string}
     */
    MusicLedgerLineInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     *
     * @param {string} value
     */
    MusicLedgerLineInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicLedgerLineInputComponent = MusicLedgerLineInputComponent;
})(MyScript);