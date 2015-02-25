(function (scope) {
    'use strict';
    /**
     * Char input component
     *
     * @class CharacterInputComponent
     * @extends AbstractTextInputComponent
     * @constructor
     */
    function CharacterInputComponent () {
        this.type = 'inputCharacter';
        this.alternates = [];
    }

    /**
     * Inheritance property
     */
    CharacterInputComponent.prototype = new scope.AbstractTextInputComponent();

    /**
     * Constructor property
     */
    CharacterInputComponent.prototype.constructor = CharacterInputComponent;

    /**
     * Get character input alternates
     *
     * @method getAlternates
     * @returns {CharacterInputComponentAlternate[]}
     */
    CharacterInputComponent.prototype.getAlternates = function () {
        return this.alternates;
    };

    /**
     * Set character input alternates
     *
     * @method setAlternates
     * @param {CharacterInputComponentAlternate[]} alternates
     */
    CharacterInputComponent.prototype.setAlternates = function (alternates) {
        this.alternates = alternates;
    };

    /**
     * Add a character input alternate
     *
     * @method addAlternate
     * @param {CharacterInputComponent} alternate
     */
    CharacterInputComponent.prototype.addAlternate = function (alternate) {
        this.alternates.push(alternate);
    };

    // Export
    scope.CharacterInputComponent = CharacterInputComponent;
})(MyScript);