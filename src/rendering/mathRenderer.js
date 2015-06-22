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
     * @param {PenParameters} [parameters]
     */
    MathRenderer.prototype.drawRecognitionResult = function (components, recognitionResult, context, parameters) {
        var params = this.getPenParameters();
        if (parameters) {
            params = parameters;
        }
        var notScratchOutComponents = this.removeScratchOut(components, recognitionResult.getScratchOutResults());
        this.drawComponents(notScratchOutComponents, context, params);
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {Object} context
     * @param {PenParameters} [parameters]
     */
    MathRenderer.prototype.drawComponents = function (components, context, parameters) {
        var params = this.getPenParameters();
        if (parameters) {
            params = parameters;
        }
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component, context, params); // super
            } else {
                throw new Error('not implemented');
            }
        }
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