/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function Stroker () {
        this.writing = false;
        this.strokes = [];
        this.currentStroke = null;
        this.undoRedoStack = [];
    }

    /**
     *
     * @type {Object}
     */
    Stroker.prototype = Object.create(Object.prototype);

    /**
     *
     */
    Stroker.prototype.isWriting = function () {
        return this.writing;
    };

    /**
     *
     */
    Stroker.prototype.getCurrentStroke = function () {
        return this.currentStroke;
    };

    /**
     *
     * @param x
     * @param y
     */
    Stroker.prototype.startStrokeWriting = function (x, y) {
        this.currentStroke = new Stroke();
        this.currentStroke.addX(x);
        this.currentStroke.addY(y);
        this.writing = true;
    };

    /**
     *
     * @param x
     * @param y
     */
    Stroker.prototype.continueStrokeWriting = function (x, y) {
        if (this.writing) {
            this.currentStroke.addX(x);
            this.currentStroke.addY(y);
        }
    };

    /**
     *
     * @param event
     */
    Stroker.prototype.endStrokeWriting = function (event) {
        this.strokes.push(this.currentStroke);
        this.writing = false;
        event.preventDefault();
    };

    /**
     *
     */
    Stroker.prototype.clear = function () {
        this.writing = false;
        this.strokes = [];
        this.currentStroke = null;
        this.undoRedoStack = [];
    };

    /**
     *
     */
    Stroker.prototype.isEmpty = function () {
        return this.strokes.length === 0;
    };

    /**
     *
     */
    Stroker.prototype.isRedoEmpty = function () {
        return this.undoRedoStack.length === 0;
    };

    /**
     *
     */
    Stroker.prototype.undo = function () {
        this.undoRedoStack.push(this.strokes[this.strokes.length - 1]);
        this.strokes.pop();
    };

    /**
     *
     */
    Stroker.prototype.redo = function () {
        this.strokes.push(this.undoRedoStack[this.undoRedoStack.length - 1]);
        this.undoRedoStack.pop();
    };

    /**
     *
     */
    Stroker.prototype.getStrokes = function () {
        return this.strokes;
    };

    /**
     *
     */
    Stroker.prototype.getUndoRedoStack = function () {
        return this.undoRedoStack;
    };

    /**
     *
     */
    Stroker.prototype.clearUndoRedoStack = function () {
        this.undoRedoStack = [];
    };

    /**
     *
     * @param currentNonRecoStrokes
     * @param index
     */
    Stroker.prototype.copy = function (currentNonRecoStrokes, index) {
        for (index; index < this.strokes.length; index++) {
            currentNonRecoStrokes.push(this.strokes[index]);
        }
    };

    /**
     *
     * @type {Stroker}
     */
    scope.Stroker = Stroker;
})(MyScript);