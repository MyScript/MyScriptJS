'use strict';

(function (scope) {
    /**
     * Abstract music input component
     *
     * @class AbstractMusicInputComponent
     * @extends AbstractComponent
     * @constructor
     */
    function AbstractMusicInputComponent(obj) {
        scope.AbstractComponent.call(this);
        if (obj) {
            if (obj.boundingBox) {
                this.boundingBox = new scope.Rectangle(obj.boundingBox);
            }
        }
    }

    /**
     * Inheritance property
     */
    AbstractMusicInputComponent.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    AbstractMusicInputComponent.prototype.constructor = AbstractMusicInputComponent;

    /**
     * Get input component bounding-box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    AbstractMusicInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding-box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    AbstractMusicInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.AbstractMusicInputComponent = AbstractMusicInputComponent;
})(MyScript);
