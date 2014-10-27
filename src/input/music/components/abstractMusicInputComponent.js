(function (scope) {

    /**
     * String input component
     * @constructor
     */
    function AbstractMusicInputComponent () {
    }

    /**
     *
     * @type {MyScript.AbstractComponent}
     */
    AbstractMusicInputComponent.prototype = new scope.AbstractComponent();

    /**
     *
     * @type {AbstractMusicInputComponent}
     */
    AbstractMusicInputComponent.prototype.constructor = AbstractMusicInputComponent;

    /**
     *
     * @returns {Rectangle}
     */
    AbstractMusicInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     *
     * @param {Rectangle} boundingBox
     */
    AbstractMusicInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.AbstractMusicInputComponent = AbstractMusicInputComponent;
})(MyScript);