(function (scope) {

    /**
     * Music decoration input
     * @constructor
     */
    function MusicDecorationInput () {
    }

    /**
     *
     * @returns {string}
     */
    MusicDecorationInput.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     *
     * @param {string} symbol
     */
    MusicDecorationInput.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };

    /**
     *
     * @returns {string}
     */
    MusicDecorationInput.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     *
     * @param {string} placement
     */
    MusicDecorationInput.prototype.setPlacement = function (placement) {
        this.placement = placement;
    };

    // Export
    scope.MusicDecorationInput = MusicDecorationInput;
})(MyScript);