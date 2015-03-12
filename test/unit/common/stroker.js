'use strict';

describe('MyScriptJS: common/inkManager.js', function () {

    it('InkManager object exist', function () {
        expect(MyScript.InkManager).to.exist;
        expect(MyScript.InkManager).not.to.be.null;
        expect(MyScript.InkManager).to.not.be.undefined;
    });

    var stroker = new MyScript.InkManager();
    it('InkManager constructor', function () {
        expect(stroker).to.be.an('object');
        expect(stroker).to.be.an.instanceof(MyScript.InkManager);
        expect(stroker).to.have.ownProperty('writing');
        expect(stroker).to.have.ownProperty('strokes');
        expect(stroker).to.have.ownProperty('currentStroke');
        expect(stroker).to.have.ownProperty('undoRedoStack');
    });

    it('InkManager is writing', function () {
        expect(stroker.isWriting()).to.be.an('boolean');
        expect(stroker.isWriting()).to.equal(false);
    });

    it('InkManager is empty', function () {
        expect(stroker.isEmpty()).to.be.true;
    });

    it('InkManager current stroke getter', function () {
        expect(stroker.getCurrentStroke()).to.be.null;
    });

    it('InkManager undo does nothing', function () {
        stroker.undo();
        expect(stroker.isEmpty()).to.be.true;
    });

    it('InkManager start stroke writing', function () {
        stroker.startInkCapture(50, 2);
        expect(stroker.getCurrentStroke()).to.be.an.instanceof(MyScript.Stroke);
        expect(stroker.getCurrentStroke().getX()[0]).to.equal(50);
        expect(stroker.getCurrentStroke().getY()[0]).to.equal(2);
        expect(stroker.isWriting()).to.equal(true);
    });

    it('InkManager continue stroke writing', function () {
        stroker.continueInkCapture(60, 8);
        expect(stroker.getCurrentStroke()).to.be.an.instanceof(MyScript.Stroke);
        expect(stroker.getCurrentStroke().getX()[1]).to.equal(60);
        expect(stroker.getCurrentStroke().getY()[1]).to.equal(8);
        expect(stroker.isWriting()).to.equal(true);
    });

    it('InkManager start stroke writing fail', function () {
        expect(function(){stroker.startInkCapture(60, 8);}).to.throw(Error);
    });

    it('InkManager end stroke writing', function () {
        stroker.endInkCapture();
        expect(stroker.getStrokes()[0]).to.equal(stroker.getCurrentStroke());
        expect(stroker.isWriting()).to.equal(false);
    });

    it('InkManager continue stroke writing fail', function () {
        expect(function(){stroker.continueInkCapture(60, 8);}).to.throw(Error);
    });

    it('InkManager end stroke writing fail', function () {
        expect(function(){stroker.endInkCapture();}).to.throw(Error);
    });

    it('has a current stroke', function () {
        expect(stroker.getCurrentStroke()).not.to.be.null;
    });

    it('InkManager is not empty', function () {
        expect(stroker.isEmpty()).to.be.false;
    });

    it('InkManager redo does nothing', function () {
        stroker.redo();
        expect(stroker.isRedoEmpty()).to.be.true;
    });

    it('InkManager is redo empty', function () {
        expect(stroker.isRedoEmpty()).to.be.true;
    });

    it('InkManager undo', function () {
        assert.equal(stroker.getStrokes().length, 1, 'There is one stroke on strokes array');
        var stroke = stroker.getStrokes()[stroker.getStrokes().length - 1];

        stroker.undo();

        expect(stroker.getUndoRedoStack().length).to.equal(1);
        expect(stroker.getStrokes().length).to.equal(0);
        expect(stroke).to.deep.equal(stroker.getUndoRedoStack()[stroker.getUndoRedoStack().length - 1]);
    });

    it('InkManager is redo not empty', function () {
        expect(stroker.isRedoEmpty()).to.be.false;
    });

    it('InkManager redo', function () {
        assert.equal(stroker.getStrokes().length, 0, 'There is no stroke on strokes array');
        var stroke = stroker.getUndoRedoStack()[stroker.getUndoRedoStack().length - 1];

        stroker.redo();

        expect(stroker.getUndoRedoStack().length).to.equal(0);
        expect(stroker.getStrokes().length).to.equal(1);
        expect(stroke).to.deep.equal(stroker.getStrokes()[stroker.getStrokes().length - 1]);

    });

    it('InkManager clear', function () {
        stroker.clear();

        expect(stroker.isWriting()).to.equal(false);
        expect(stroker.getStrokes().length).to.equal(0);
        expect(stroker.getCurrentStroke()).to.be.null;
        expect(stroker.getUndoRedoStack().length).to.equal(0);
    });

    it('InkManager strokes getter', function () {
        stroker.startInkCapture(50, 2);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.continueInkCapture(60, 8);
        assert.isTrue(stroker.isWriting(), 'writing must be true');
        stroker.endInkCapture();
        assert.isFalse(stroker.isWriting(), 'writing must be false');

        expect(stroker.getStrokes().length).to.equal(1);
        expect(stroker.getStrokes()[stroker.getStrokes().length - 1]).to.deep.equal(stroker.getCurrentStroke());
    });

    it('InkManager Undo/redo Stack getter', function () {
        assert.equal(stroker.getStrokes().length, 1, 'There is one stroke on strokes array');
        var stroke = stroker.getStrokes()[stroker.getStrokes().length - 1];

        stroker.undo();

        expect(stroker.getUndoRedoStack().length).to.equal(1);
        expect(stroker.getUndoRedoStack()[stroker.getUndoRedoStack().length - 1]).to.deep.equal(stroke);
    });

    it('InkManager clear Undo/redo Stack', function () {
        stroker.clearUndoRedoStack();

        expect(stroker.getUndoRedoStack().length).to.equal(0);
        expect(stroker.getUndoRedoStack()).to.be.empty;
    });

    it('InkManager copy', function () {
        var copyStrokes = [];
        // add one stroke
        stroker.startInkCapture(50, 2);
        stroker.continueInkCapture(60, 8);
        stroker.endInkCapture();
        // add one stroke
        stroker.startInkCapture(86, 4);
        stroker.continueInkCapture(144, 7);
        stroker.endInkCapture();
        assert.equal(stroker.getStrokes().length, 2, 'There is two strokes on strokes array');

        stroker.copy(copyStrokes, 0);

        expect(stroker.getStrokes()).to.deep.equal(copyStrokes);
    });
});