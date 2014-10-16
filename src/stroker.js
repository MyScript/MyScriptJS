/**
 * The Stroker class that can use to store writing strokes and manage the undo/redo/clear system
 *
 * @class stroker
 * @param scope
 */
(function (scope) {

    /**
     * @constructor
     */
    function Stroker () {
        this.writing = false;
        this.strokes = [];
        this.currentStroke = null;
        this.undoRedoStack = [];
    }

    /**
     * @description Initialize a stroker
     * @type {Object}
     */
    Stroker.prototype = Object.create(Object.prototype);

    /**
     * @description Is Wrinting a stoke
     */
    Stroker.prototype.isWriting = function () {
        return this.writing;
    };

    /**
     * @description Get the last current Stroke write
     */
    Stroker.prototype.getCurrentStroke = function () {
        return this.currentStroke;
    };

    /**
     * @description Start to write a stroke
     * @param x Abcisse coordinate
     * @param y ordinate coordinate
     */
    Stroker.prototype.startStrokeWriting = function (x, y) {
        this.currentStroke = new Stroke();
        this.currentStroke.addX(x);
        this.currentStroke.addY(y);
        this.writing = true;
    };

    /**
     * @description Continue to write a stroke
     * @param x Abcisse coordinate
     * @param y ordinate coordinate
     */
    Stroker.prototype.continueStrokeWriting = function (x, y) {
        if (this.writing) {
            this.currentStroke.addX(x);
            this.currentStroke.addY(y);
        }
    };

    /**
     * @description End of writing a stroke
     * @param event
     */
    Stroker.prototype.endStrokeWriting = function (event) {
        this.strokes.push(this.currentStroke);
        this.writing = false;
        event.preventDefault();
    };

    /**
     * @description Clear the strokes list
     */
    Stroker.prototype.clear = function () {
        this.writing = false;
        this.strokes = [];
        this.currentStroke = null;
        this.undoRedoStack = [];
    };

    /**
     * @description Is The Strokes list is empty
     */
    Stroker.prototype.isEmpty = function () {
        return this.strokes.length === 0;
    };

    /**
     * @description Is the Undo/Redo Stack empty
     */
    Stroker.prototype.isRedoEmpty = function () {
        return this.undoRedoStack.length === 0;
    };

    /**
     * @description Make an undo
     */
    Stroker.prototype.undo = function () {
        this.undoRedoStack.push(this.strokes[this.strokes.length - 1]);
        this.strokes.pop();
    };

    /**
     * @description Make a redo
     */
    Stroker.prototype.redo = function () {
        this.strokes.push(this.undoRedoStack[this.undoRedoStack.length - 1]);
        this.undoRedoStack.pop();
    };

    /**
     * @description Get the strokes list
     */
    Stroker.prototype.getStrokes = function () {
        return this.strokes;
    };

    /**
     * @description Get the Undo/Redo Stack
     */
    Stroker.prototype.getUndoRedoStack = function () {
        return this.undoRedoStack;
    };

    /**
     * @description Clear the Undo/Redo Stack
     */
    Stroker.prototype.clearUndoRedoStack = function () {
        this.undoRedoStack = [];
    };

    /**
     * @description Copy the strokes values from index on an other list of strokes
     * @param strokes List of strokes
     * @param index Position to start the copy
     */
    Stroker.prototype.copy = function (strokes, index) {
        for (index; index < this.strokes.length; index++) {
            strokes.push(this.strokes[index]);
        }
    };

    /**
     * @description Initialize the Stroker
     * @type {Stroker}
     */
    scope.Stroker = Stroker;
})(MyScript);