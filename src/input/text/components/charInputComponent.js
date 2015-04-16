'use strict';

(function (scope) {
    /**
     * Char input component
     *
     * @class CharInputComponent
     * @extends AbstractTextInputComponent
     * @constructor
     */
    function CharInputComponent() {
        this.type = 'char';
    }

    /**
     * Inheritance property
     */
    CharInputComponent.prototype = new scope.AbstractTextInputComponent();

    /**
     * Constructor property
     */
    CharInputComponent.prototype.constructor = CharInputComponent;

    /**
     * Get character
     *
     * @method getCharacter
     * @returns {String}
     */
    CharInputComponent.prototype.getCharacter = function () {
        return this.character;
    };

    /**
     * Set character
     *
     * @method setCharacter
     * @param {String} character
     */
    CharInputComponent.prototype.setCharacter = function (character) {
        this.character = character;
    };

    // Export
    scope.CharInputComponent = CharInputComponent;
})(MyScript);