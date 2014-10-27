(function (scope) {

    /**
     * Char input component
     * @constructor
     */
    function CharacterInputComponent () {
        this.type = 'inputCharacter';
        this.alternates = [];
    }

    /**
     *
     * @type {MyScript.AbstractComponent}
     */
    CharacterInputComponent.prototype = new scope.AbstractComponent();

    /**
     *
     * @type {CharacterInputComponent}
     */
    CharacterInputComponent.prototype.constructor = CharacterInputComponent;

    /**
     *
     * @returns {Array}
     */
    CharacterInputComponent.prototype.getAlternates = function () {
        return this.alternates;
    };

    /**
     *
     * @param {Array} alternates
     */
    CharacterInputComponent.prototype.setAlternates = function (alternates) {
        this.alternates = alternates;
    };

    /**
     *
     * @param {CharacterInputComponent} alternate
     */
    CharacterInputComponent.prototype.addAlternate = function (alternate) {
        this.alternates.push(alternate);
    };

    /**
     *
     * @returns {Rectangle}
     */
    CharacterInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     *
     * @param {Rectangle} boundingBox
     */
    CharacterInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.CharacterInputComponent = CharacterInputComponent;
})(MyScript);