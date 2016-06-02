'use strict';

(function (scope) {
    /**
     * Represent the Image Renderer. It's used to calculate the Image ink rendering in HTML5 canvas
     *
     * @class ImageRenderer
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function ImageRenderer(context) {
        scope.AbstractRenderer.call(this, context);
    }

    /**
     * Inheritance property
     */
    ImageRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    ImageRenderer.prototype.constructor = ImageRenderer;


    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    ImageRenderer.prototype.drawComponents = function (components) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component); // super
            } else {
                console.log(components);
                console.log(typeof component);
                throw new Error('not implemented');
            }
        }
    };

    // Export
    scope.ImageRenderer = ImageRenderer;
})(MyScript);
