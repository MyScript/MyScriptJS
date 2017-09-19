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
        this.clear();
        if (recognitionResult) {
            var notScratchOutComponents = _filterScratchOut(components, recognitionResult.getScratchOutResults());
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
                if(!component.scratchedStroke){
                    scope.AbstractRenderer.prototype.drawComponent.call(this, component); // super
                }
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
    var _filterScratchOut = function (components, scratchOutResults) {
        if (!scratchOutResults || scratchOutResults.length === 0) {
            return components;
        }
        for (var k in scratchOutResults) {
            for (var n in scratchOutResults[k].getErasedInkRanges()) {
                components[scratchOutResults[k].getErasedInkRanges()[n].getComponent()].scratchedStroke = true;
            }
            for (var p in scratchOutResults[k].getInkRanges()) {
                components[scratchOutResults[k].getInkRanges()[p].getComponent()].scratchedStroke = true;;
            }
        }
        return components;
    };

    // Export
    scope.MathRenderer = MathRenderer;
})(MyScript);
