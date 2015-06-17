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
     * @deprecated Use 'getLabel'
     * @method getCharacter
     * @returns {String}
     */
    CharInputComponent.prototype.getCharacter = function () {
        return this.character;
    };

    /**
     * Set character
     *
     * @deprecated Use 'setLabel'
     * @method setCharacter
     * @param {String} character
     */
    CharInputComponent.prototype.setCharacter = function (character) {
        this.character = character;
    };

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    CharInputComponent.prototype.getLabel = function () {
        return this.character;
    };

    /**
     * Set label
     *
     * @method setLabel
     * @param {String} label
     */
    CharInputComponent.prototype.setLabel = function (label) {
        this.character = label;
    };

    // Export
    scope.CharInputComponent = CharInputComponent;
})(MyScript);