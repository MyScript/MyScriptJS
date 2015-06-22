'use strict';

(function (scope) {
    /**
     * The InkManager class that can use to store writing strokes and manage the undo/redo/clear system
     *
     * @class InkManager
     * @constructor
     */
    function InkManager() {
        scope.AbstractRenderer.call(this);
        this.stroke = undefined;
        this.writing = false;
    }

    /**
     * Inheritance property
     */
    InkManager.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    InkManager.prototype.constructor = InkManager;

    /**
     * Is Writing a stroke
     *
     * @method isWriting
     * @returns {Boolean}
     */
    InkManager.prototype.isWriting = function () {
        return this.writing;
    };

    /**
     * Get the last wrote stroke
     *
     * @method getStroke
     * @returns {Stroke}
     */
    InkManager.prototype.getStroke = function () {
        return this.stroke;
    };

    InkManager.prototype.drawStart = function (x, y, t, context) {
        if (!this.writing) {
            this.writing = true;
            this.stroke = new scope.Stroke();
            this.stroke.setColor(this.penParameters.getColor());
            this.stroke.setWidth(this.penParameters.getWidth());
            this.stroke.setAlpha(this.penParameters.getAlpha());
            this.stroke.addPoint(x, y, t);
            this.clear(context);
            this.drawStroke(this.stroke, context);
        } else {
            throw new Error('Stroke capture already running');
        }
    };

    InkManager.prototype.drawContinue = function (x, y, t, context) {
        if (this.writing) {
            this.stroke.addPoint(x, y, t);
            this.clear(context);
            this.drawStroke(this.stroke, context);
        } else {
            throw new Error('Missing startInkCapture');
        }
    };

    InkManager.prototype.drawEnd = function (x, y, t, context) {
        if (this.writing) {
            this.stroke.addPoint(x, y, t);
            this.clear(context);
            this.drawStroke(this.stroke, context);
            this.writing = false;
        } else {
            throw new Error('Missing startInkCapture');
        }
    };

    // Export
    scope.InkManager = InkManager;
})(MyScript);