'use strict';

(function (scope) {
    /**
     * Represent the Math Renderer. It's used to calculate the math ink rendering in HTML5 canvas
     *
     * @class MathRenderer
     * @extends AbstractRenderer
     * @constructor
     */
    function MathRenderer() {
        scope.AbstractRenderer.call(this);
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
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    MathRenderer.prototype.drawRecognitionResult = function (components, recognitionResult, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var notScratchOutComponents = this.removeScratchOut(components, recognitionResult.getScratchOutResults());
        this.drawComponents(notScratchOutComponents, context, params);
    };

    /**
     * Remove scratch out from input components
     *
     * @param {AbstractComponent[]} components
     * @param {MathScratchOut[]} scratchOutResults
     * @returns {AbstractComponent[]} notScratchOutComponents
     */
    MathRenderer.prototype.removeScratchOut = function (components, scratchOutResults) {
        if (!scratchOutResults || scratchOutResults.length === 0) {
            return components;
        }

        var cloneComponents = components.slice(0);
        var componentsToRemove = [];

        for (var k in scratchOutResults) {
            if (scratchOutResults[k].getErasedInkRanges()) {
                for (var n in scratchOutResults[k].getErasedInkRanges()) {
                    componentsToRemove.push(scratchOutResults[k].getErasedInkRanges()[n].getComponent());
                }
                for (var p in scratchOutResults[k].getInkRanges()) {
                    componentsToRemove.push(scratchOutResults[k].getInkRanges()[p].getComponent());
                }
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