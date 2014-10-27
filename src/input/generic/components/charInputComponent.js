(function (scope) {

    /**
     * Char input component
     * @constructor
     */
    function CharInputComponent () {
        this.type = 'char';
    }

    /**
     *
     * @type {MyScript.AbstractComponent}
     */
    CharInputComponent.prototype = new scope.AbstractComponent();

    /**
     *
     * @type {CharInputComponent}
     */
    CharInputComponent.prototype.constructor = CharInputComponent;

    /**
     *
     * @returns {string}
     */
    CharInputComponent.prototype.getCharacter = function () {
        return this.character;
    };

    /**
     *
     * @param {string} character
     */
    CharInputComponent.prototype.setCharacter = function (character) {
        this.character = character;
    };

    /**
     *
     * @returns {Rectangle}
     */
    CharInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     *
     * @param {Rectangle} boundingBox
     */
    CharInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.CharInputComponent = CharInputComponent;
})(MyScript);