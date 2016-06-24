'use strict';

(function (scope) {
    /**
     * Represent the Math Renderer. It's used to calculate the math ink rendering in HTML5 canvas
     *
     * @class MathRenderer
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function MathRenderer(context) {
        scope.AbstractRenderer.call(this, context);
    }

    /**
     * Inheritance property
     */
    MathRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    MathRenderer.prototype.constructor = MathRenderer;

    /**
     * Draw math recognition result on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {MathDocument} recognitionResult
     */
    MathRenderer.prototype.drawRecognitionResult = function (components, recognitionResult) {
        if (recognitionResult) {
            var notScratchOutComponents = _removeMathScratchOut(components, recognitionResult.getScratchOutResults());
            this.drawComponents(notScratchOutComponents);
        } else {
            this.drawComponents(components);
        }
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    MathRenderer.prototype.drawComponents = function (components) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component); // super
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Return non-scratched out components
     *
     * @private
     * @param components
     * @param scratchOutResults
     * @returns {*}
     */
    var _removeMathScratchOut = function (components, scratchOutResults) {
        if (!scratchOutResults || scratchOutResults.length === 0) {
            return components;
        }

        var cloneComponents = components.slice(0);
        var componentsToRemove = [];

        for (var k in scratchOutResults) {
            for (var n in scratchOutResults[k].getErasedInkRanges()) {
                componentsToRemove.push(scratchOutResults[k].getErasedInkRanges()[n].getComponent());
            }
            for (var p in scratchOutResults[k].getInkRanges()) {
                componentsToRemove.push(scratchOutResults[k].getInkRanges()[p].getComponent());
            }
        }

        componentsToRemove.sort(function (a, b) {
            return b - a;
        });

        for (var z in componentsToRemove) {
            cloneComponents.splice(componentsToRemove[z], 1);
        }
        return cloneComponents;
    };

    // Export
    scope.MathRenderer = MathRenderer;
})(MyScript);
