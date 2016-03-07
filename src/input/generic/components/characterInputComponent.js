'use strict';

(function (scope) {
    /**
     * Char input component
     *
     * @class CharacterInputComponent
     * @extends AbstractComponent
     * @constructor
     */
    function CharacterInputComponent(obj) {
        scope.AbstractComponent.call(this);
        this.type = 'inputCharacter';
        this.alternates = [];
        if (obj) {
            if (obj.alternates) {
                for (var i in obj.alternates) {
                    this.alternates.push(new scope.CharacterInputComponentAlternate(obj.alternates[i]));
                }
            }
            if (obj.boundingBox) {
                this.boundingBox = new scope.Rectangle(obj.boundingBox);
            }
        }
    }

    /**
     * Inheritance property
     */
    CharacterInputComponent.prototype = new scope.AbstractComponent();

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

    /**
     * Get input component bounding-box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    CharacterInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding-box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    CharacterInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.CharacterInputComponent = CharacterInputComponent;
})(MyScript);
