'use strict';

(function (scope) {
    /**
     * Abstract text input component
     *
     * @class AbstractTextInputComponent
     * @extends AbstractComponent
     * @constructor
     */
    function AbstractTextInputComponent(obj) {
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
    AbstractTextInputComponent.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    AbstractTextInputComponent.prototype.constructor = AbstractTextInputComponent;

    /**
     * Get input component bounding-box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    AbstractTextInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding-box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    AbstractTextInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.AbstractTextInputComponent = AbstractTextInputComponent;
})(MyScript);
