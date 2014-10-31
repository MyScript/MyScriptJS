(function (scope) {

    /**
     * Music decoration input
     * @constructor
     */
    function MusicDecorationInput () {
    }

    /**
     * Get symbol
     * @returns {String}
     */
    MusicDecorationInput.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     * Set symbol
     * @param {String} symbol
     */
    MusicDecorationInput.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };

    /**
     * Get placement
     * @returns {String}
     */
    MusicDecorationInput.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Set placement
     * @param {String} placement
     */
    MusicDecorationInput.prototype.setPlacement = function (placement) {
        this.placement = placement;
    };

    // Export
    scope.MusicDecorationInput = MusicDecorationInput;
})(MyScript);