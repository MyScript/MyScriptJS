'use strict';

describe('MyScriptJS: common/stroker.js', function () {

    it('Stroker object exist', function () {
        expect(MyScript.Stroker).to.exist;
        expect(MyScript.Stroker).not.to.be.null;
        expect(MyScript.Stroker).to.not.be.undefined;
    });

    it('Stroker constructor', function () {
        var stroker = new MyScript.Stroker();
        expect(stroker).to.be.an('object');
        expect(stroker).to.be.an.instanceof(MyScript.Stroker);
        expect(stroker).to.have.ownProperty('writing');
        expect(stroker).to.have.ownProperty('strokes');
        expect(stroker).to.have.ownProperty('currentStroke');
        expect(stroker).to.have.ownProperty('undoRedoStack');
    });

    it('Stroker is writing', function () {
        var stroker = new MyScript.Stroker();
        expect(stroker.isWriting()).to.be.an('boolean');
        expect(stroker.isWriting()).to.equal(false);
    });

    it('Stroker current stroke getter', function () {
        var stroker = new MyScript.Stroker();
        expect(stroker.getCurrentStroke()).to.be.null;
    });

    it('Stroker start stroke writing', function () {
        var stroker = new MyScript.Stroker();
        stroker.startStrokeWriting(50, 2);
        expect(stroker.getCurrentStroke()).to.be.an.instanceof(MyScript.Stroke);
        expect(stroker.getCurrentStroke().getX()[0]).to.equal(50);
        expect(stroker.getCurrentStroke().getY()[0]).to.equal(2);
        expect(stroker.isWriting()).to.equal(true);
    });

    it('Stroker continue stroke writing', function () {
        var stroker = new MyScript.Stroker();
        stroker.startStrokeWriting(50, 2);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.continueStrokeWriting(60, 8);
        expect(stroker.getCurrentStroke()).to.be.an.instanceof(MyScript.Stroke);
        expect(stroker.getCurrentStroke().getX()[1]).to.equal(60);
        expect(stroker.getCurrentStroke().getY()[1]).to.equal(8);
        expect(stroker.isWriting()).to.equal(true);
    });

    it('Stroker end stroke writing', function () {
        var stroker = new MyScript.Stroker();
        stroker.startStrokeWriting(50, 2);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.continueStrokeWriting(60, 8);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.endStrokeWriting();
        expect(stroker.getStrokes()[0]).to.equal(stroker.getCurrentStroke());
        expect(stroker.isWriting()).to.equal(false);
    });

    it('Stroker clear', function () {
        var stroker = new MyScript.Stroker();
        stroker.startStrokeWriting(50, 2);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.continueStrokeWriting(60, 8);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.endStrokeWriting();
        assert.isFalse(stroker.isWriting(), 'writing must be false');

        stroker.clear();

        expect(stroker.isWriting()).to.equal(false);
        expect(stroker.getStrokes().length).to.equal(0);
        expect(stroker.getCurrentStroke()).to.be.null;
        expect(stroker.getUndoRedoStack().length).to.equal(0);
    });

    it('Stroker is empty', function () {
        var stroker = new MyScript.Stroker();
        expect(stroker.isEmpty()).to.be.true;
    });

    it('Stroker is empty', function () {
        var stroker = new MyScript.Stroker();
        expect(stroker.isEmpty()).to.be.true;
    });

    it('Stroker is redo empty', function () {
        var stroker = new MyScript.Stroker();
        expect(stroker.isRedoEmpty()).to.be.true;
    });

    it('Stroker undo', function () {
        var stroker = new MyScript.Stroker(), stroke = null;
        stroker.startStrokeWriting(50, 2);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.continueStrokeWriting(60, 8);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.endStrokeWriting();
        assert.isFalse(stroker.isWriting(), 'writing must be false');
        assert.equal(stroker.getStrokes().length, 1, 'There is one stroke on strokes array');
        stroke = stroker.getStrokes()[stroker.getStrokes().length - 1];

        stroker.undo();

        expect(stroker.getUndoRedoStack().length).to.equal(1);
        expect(stroker.getStrokes().length).to.equal(0);
        expect(stroke).to.deep.equal(stroker.getUndoRedoStack()[stroker.getUndoRedoStack().length - 1]);

    });

    it('Stroker redo', function () {
        var stroker = new MyScript.Stroker(), stroke = null;
        stroker.startStrokeWriting(50, 2);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.continueStrokeWriting(60, 8);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.endStrokeWriting();
        assert.isFalse(stroker.isWriting(), 'writing must be false');
        assert.equal(stroker.getStrokes().length, 1, 'There is one stroke on strokes array');
        stroker.undo();
        assert.equal(stroker.getUndoRedoStack().length, 1, 'The Stroke is on Undo/Redo Stack');
        assert.equal(stroker.getStrokes().length, 0, 'There is no stroke on strokes array');
        stroke = stroker.getUndoRedoStack()[stroker.getUndoRedoStack().length - 1];

        stroker.redo();

        expect(stroker.getUndoRedoStack().length).to.equal(0);
        expect(stroker.getStrokes().length).to.equal(1);
        expect(stroke).to.deep.equal(stroker.getStrokes()[stroker.getStrokes().length - 1]);

    });

    it('Stroker strokes getter', function () {
        var stroker = new MyScript.Stroker();
        stroker.startStrokeWriting(50, 2);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.continueStrokeWriting(60, 8);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.endStrokeWriting();
        assert.isFalse(stroker.isWriting(), 'writing must be false');

        expect(stroker.getStrokes().length).to.equal(1);
        expect(stroker.getStrokes()[stroker.getStrokes().length - 1]).to.deep.equal(stroker.getCurrentStroke());
    });

    it('Stroker Undo/redo Stack getter', function () {
        var stroker = new MyScript.Stroker(), stroke = null;
        stroker.startStrokeWriting(50, 2);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.continueStrokeWriting(60, 8);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.endStrokeWriting();
        assert.isFalse(stroker.isWriting(), 'writing must be false');
        assert.equal(stroker.getStrokes().length, 1, 'There is one stroke on strokes array');
        stroke = stroker.getStrokes()[stroker.getStrokes().length - 1];

        stroker.undo();

        expect(stroker.getUndoRedoStack().length).to.equal(1);
        expect(stroker.getUndoRedoStack()[stroker.getUndoRedoStack().length - 1]).to.deep.equal(stroke);
    });

    it('Stroker clear Undo/redo Stack', function () {
        var stroker = new MyScript.Stroker();
        stroker.startStrokeWriting(50, 2);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.continueStrokeWriting(60, 8);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.endStrokeWriting();
        assert.isFalse(stroker.isWriting(), 'writing must be false');
        assert.equal(stroker.getStrokes().length, 1, 'There is one stroke on strokes array');
        stroker.undo();

        stroker.clearUndoRedoStack();

        expect(stroker.getUndoRedoStack().length).to.equal(0);
        expect(stroker.getUndoRedoStack()).to.be.empty;
    });

    it('Stroker copy', function () {
        var stroker = new MyScript.Stroker(), copyStrokes = [];
        // add one stroke
        stroker.startStrokeWriting(50, 2);
        stroker.continueStrokeWriting(60, 8);
        stroker.endStrokeWriting();
        // add one stroke
        stroker.startStrokeWriting(86, 4);
        stroker.continueStrokeWriting(144, 7);
        stroker.endStrokeWriting();
        assert.equal(stroker.getStrokes().length, 2, 'There is two strokes on strokes array');

        stroker.copy(copyStrokes, 0);

        expect(stroker.getStrokes()).to.deep.equal(copyStrokes);
    });
});