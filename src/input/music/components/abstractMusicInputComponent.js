(function (scope) {

    /**
     * Abstract music input component
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
     * Get input component bounding-box
     * @returns {Rectangle}
     */
    AbstractMusicInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding-box
     * @param {Rectangle} boundingBox
     */
    AbstractMusicInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.AbstractMusicInputComponent = AbstractMusicInputComponent;
})(MyScript);