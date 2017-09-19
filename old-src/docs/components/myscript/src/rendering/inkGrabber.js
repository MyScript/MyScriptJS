'use strict';

(function (scope) {
    /**
     * The InkGrabber class that render, capture and build strokes
     *
     * @class InkGrabber
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function InkGrabber(context) {
        scope.AbstractRenderer.call(this, context);
        this.stroke = undefined;
        this.writing = false;
    }

    /**
     * Inheritance property
     */
    InkGrabber.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    InkGrabber.prototype.constructor = InkGrabber;

    /**
     * Is Writing a stroke
     *
     * @method isWriting
     * @returns {Boolean}
     */
    InkGrabber.prototype.isWriting = function () {
        return this.writing;
    };

    /**
     * Get the last wrote stroke
     *
     * @method getStroke
     * @returns {StrokeComponent}
     */
    InkGrabber.prototype.getStroke = function () {
        return this.stroke;
    };

    InkGrabber.prototype.startCapture = function (x, y, t) {
        if (!this.writing) {
            this.writing = true;
            this.stroke = new scope.StrokeComponent();
            this.stroke.setColor(this.penParameters.getColor());
            this.stroke.setWidth(this.penParameters.getWidth());
            this.stroke.addPoint(x, y, t);
            this.clear();
            this.drawComponent(this.stroke);
        } else {
            throw new Error('StrokeComponent capture already running');
        }
    };

    InkGrabber.prototype.continueCapture = function (x, y, t) {
        if (this.writing) {
            this.stroke.addPoint(x, y, t);
            this.clear();
            this.drawComponent(this.stroke);
        } else {
            throw new Error('Missing startInkCapture');
        }
    };

    InkGrabber.prototype.endCapture = function (x, y, t) {
        if (this.writing) {
            this.stroke.addPoint(x, y, t);
            this.clear();
            this.drawComponent(this.stroke);
            this.writing = false;
        } else {
            throw new Error('Missing startInkCapture');
        }
    };

    // Export
    scope.InkGrabber = InkGrabber;
})(MyScript);
