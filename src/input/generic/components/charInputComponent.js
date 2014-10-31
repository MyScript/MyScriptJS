(function (scope) {

    /**
     * Char input component
     *
     * @class CharInputComponent
     * @extends AbstractComponent
     * @constructor
     */
    function CharInputComponent () {
        this.type = 'char';
    }

    /**
     * Inheritance property
     */
    CharInputComponent.prototype = new scope.AbstractComponent();

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

    /**
     * Get input component bounding box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    CharInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    CharInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.CharInputComponent = CharInputComponent;
})(MyScript);