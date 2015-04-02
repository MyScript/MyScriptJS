'use strict';

(function (scope) {
    /**
     * The InkManager class that can use to store writing strokes and manage the undo/redo/clear system
     *
     * @class InkManager
     * @constructor
     */
    function InkManager () {
        this.writing = false;
        this.strokes = [];
        this.currentStroke = null;
        this.undoRedoStack = [];
    }

    /**
     * Is Wrinting a stoke
     *
     * @method isWriting
     * @returns {Boolean}
     */
    InkManager.prototype.isWriting = function () {
        return this.writing;
    };

    /**
     * Get the last current Stroke write
     *
     * @method getCurrentStroke
     * @returns {Stroke}
     */
    InkManager.prototype.getCurrentStroke = function () {
        return this.currentStroke;
    };

    /**
     * Start ink capture
     *
     * @method startInkCapture
     * @param {Number} x abscissa coordinate
     * @param {Number} y ordinate coordinate
     * @param {Number} [t] event timestamp
     */
    InkManager.prototype.startInkCapture = function (x, y, t) {
        if (!this.writing) {
            this.currentStroke = new scope.Stroke();
            this.currentStroke.addX(x);
            this.currentStroke.addY(y);
            this.currentStroke.addT(t);
            this.writing = true;
        } else {
            throw new Error('Stroke capture already running');
        }
    };

    /**
     * Continue ink capture
     *
     * @method continueInkCapture
     * @param {Number} x abscissa coordinate
     * @param {Number} y ordinate coordinate
     * @param {Number} [t] event timestamp
     */
    InkManager.prototype.continueInkCapture = function (x, y, t) {
        if (this.writing) {
            this.currentStroke.addX(x);
            this.currentStroke.addY(y);
            this.currentStroke.addT(t);
        } else {
            throw new Error('Missing startInkCapture');
        }
    };

    /**
     * End ink capture
     *
     * @method endInkCapture
     */
    InkManager.prototype.endInkCapture = function () {
        if (this.writing) {
            this.strokes.push(this.currentStroke);
            this.writing = false;
        } else {
            throw new Error('Missing startInkCapture');
        }
    };

    /**
     * Clear the strokes list
     *
     * @method clear
     */
    InkManager.prototype.clear = function () {
        this.writing = false;
        this.strokes = [];
        this.currentStroke = null;
        this.undoRedoStack = [];
    };

    /**
     * Is The Strokes list is empty
     *
     * @method isEmpty
     * @returns {Boolean}
     */
    InkManager.prototype.isEmpty = function () {
        return this.strokes.length === 0;
    };

    /**
     * Is the Undo/Redo Stack empty
     *
     * @method isRedoEmpty
     * @returns {Boolean}
     */
    InkManager.prototype.isRedoEmpty = function () {
        return this.undoRedoStack.length === 0;
    };

    /**
     * Make an undo
     *
     * @method undo
     */
    InkManager.prototype.undo = function () {
        if (!this.isEmpty()) {
            this.undoRedoStack.push(this.strokes[this.strokes.length - 1]);
            this.strokes.pop();
        }
    };

    /**
     * Make a redo
     *
     * @method redo
     */
    InkManager.prototype.redo = function () {
        if (!this.isRedoEmpty()) {
            this.strokes.push(this.undoRedoStack[this.undoRedoStack.length - 1]);
            this.undoRedoStack.pop();
        }
    };

    /**
     * Get the strokes list
     *
     * @method getStokes
     * @returns {Stroke[]}
     */
    InkManager.prototype.getStrokes = function () {
        return this.strokes;
    };

    /**
     * Get the Undo/Redo Stack
     *
     * @method getUndoRedoStack
     * @returns {Stroke[]}
     */
    InkManager.prototype.getUndoRedoStack = function () {
        return this.undoRedoStack;
    };

    /**
     * Clear the Undo/Redo Stack
     *
     * @method clearUndoRedoStack
     */
    InkManager.prototype.clearUndoRedoStack = function () {
        this.undoRedoStack = [];
    };

    /**
     * Copy the strokes values from index on an other list of strokes
     *
     * @method copy
     * @param {Stroke[]} strokes List of strokes
     * @param {Number} index Position to start the copy
     */
    InkManager.prototype.copy = function (strokes, index) {
        for (index; index < this.strokes.length; index++) {
            strokes.push(this.strokes[index]);
        }
    };

    // Export
    scope.InkManager = InkManager;
})(MyScript);