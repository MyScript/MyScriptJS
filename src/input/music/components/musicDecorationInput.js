'use strict';

(function (scope) {
    /**
     * Music decoration input
     *
     * @class MusicDecorationInput
     * @constructor
     */
    function MusicDecorationInput () {
    }

    /**
     * Get symbol
     *
     * @method getSymbol
     * @returns {String}
     */
    MusicDecorationInput.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     * Set symbol
     *
     * @method setSymbol
     * @param {String} symbol
     */
    MusicDecorationInput.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicDecorationInput.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Set placement
     *
     * @method setPlacement
     * @param {String} placement
     */
    MusicDecorationInput.prototype.setPlacement = function (placement) {
        this.placement = placement;
    };

    // Export
    scope.MusicDecorationInput = MusicDecorationInput;
})(MyScript);