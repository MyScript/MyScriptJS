'use strict';

describe('MyScriptJS: common/inkManager.js', function () {

    it('InkManager object exist', function () {
        expect(MyScript.InkManager).to.exist;
        expect(MyScript.InkManager).not.to.be.null;
        expect(MyScript.InkManager).to.not.be.undefined;
    });

    var inkManager = new MyScript.InkManager();
    it('InkManager constructor', function () {
        expect(inkManager).to.be.an('object');
        expect(inkManager).to.be.an.instanceof(MyScript.InkManager);
        expect(inkManager).to.have.ownProperty('writing');
        expect(inkManager).to.have.ownProperty('strokes');
        expect(inkManager).to.have.ownProperty('currentStroke');
        expect(inkManager).to.have.ownProperty('undoRedoStack');
    });

    it('InkManager is writing', function () {
        expect(inkManager.isWriting()).to.be.an('boolean');
        expect(inkManager.isWriting()).to.equal(false);
    });

    it('InkManager is empty', function () {
        expect(inkManager.isEmpty()).to.be.true;
    });

    it('InkManager current stroke getter', function () {
        expect(inkManager.getCurrentStroke()).to.be.null;
    });

    it('InkManager undo does nothing', function () {
        inkManager.undo();
        expect(inkManager.isEmpty()).to.be.true;
    });

    it('InkManager start stroke writing', function () {
        inkManager.startInkCapture(50, 2);
        expect(inkManager.getCurrentStroke()).to.be.an.instanceof(MyScript.Stroke);
        expect(inkManager.getCurrentStroke().getX()[0]).to.equal(50);
        expect(inkManager.getCurrentStroke().getY()[0]).to.equal(2);
        expect(inkManager.isWriting()).to.equal(true);
    });

    it('InkManager continue stroke writing', function () {
        inkManager.continueInkCapture(60, 8);
        expect(inkManager.getCurrentStroke()).to.be.an.instanceof(MyScript.Stroke);
        expect(inkManager.getCurrentStroke().getX()[1]).to.equal(60);
        expect(inkManager.getCurrentStroke().getY()[1]).to.equal(8);
        expect(inkManager.isWriting()).to.equal(true);
    });

    it('InkManager start stroke writing fail', function () {
        expect(function(){inkManager.startInkCapture(60, 8);}).to.throw(Error);
    });

    it('InkManager end stroke writing', function () {
        inkManager.endInkCapture();
        expect(inkManager.getStrokes()[0]).to.equal(inkManager.getCurrentStroke());
        expect(inkManager.isWriting()).to.equal(false);
    });

    it('InkManager continue stroke writing fail', function () {
        expect(function(){inkManager.continueInkCapture(60, 8);}).to.throw(Error);
    });

    it('InkManager end stroke writing fail', function () {
        expect(function(){inkManager.endInkCapture();}).to.throw(Error);
    });

    it('has a current stroke', function () {
        expect(inkManager.getCurrentStroke()).not.to.be.null;
    });

    it('InkManager is not empty', function () {
        expect(inkManager.isEmpty()).to.be.false;
    });

    it('InkManager redo does nothing', function () {
        inkManager.redo();
        expect(inkManager.isRedoEmpty()).to.be.true;
    });

    it('InkManager is redo empty', function () {
        expect(inkManager.isRedoEmpty()).to.be.true;
    });

    it('InkManager undo', function () {
        assert.equal(inkManager.getStrokes().length, 1, 'There is one stroke on strokes array');
        var stroke = inkManager.getStrokes()[inkManager.getStrokes().length - 1];

        inkManager.undo();

        expect(inkManager.getUndoRedoStack().length).to.equal(1);
        expect(inkManager.getStrokes().length).to.equal(0);
        expect(stroke).to.deep.equal(inkManager.getUndoRedoStack()[inkManager.getUndoRedoStack().length - 1]);
    });

    it('InkManager is redo not empty', function () {
        expect(inkManager.isRedoEmpty()).to.be.false;
    });

    it('InkManager redo', function () {
        assert.equal(inkManager.getStrokes().length, 0, 'There is no stroke on strokes array');
        var stroke = inkManager.getUndoRedoStack()[inkManager.getUndoRedoStack().length - 1];

        inkManager.redo();

        expect(inkManager.getUndoRedoStack().length).to.equal(0);
        expect(inkManager.getStrokes().length).to.equal(1);
        expect(stroke).to.deep.equal(inkManager.getStrokes()[inkManager.getStrokes().length - 1]);

    });

    it('InkManager clear', function () {
        inkManager.clear();

        expect(inkManager.isWriting()).to.equal(false);
        expect(inkManager.getStrokes().length).to.equal(0);
        expect(inkManager.getCurrentStroke()).to.be.null;
        expect(inkManager.getUndoRedoStack().length).to.equal(0);
    });

    it('InkManager strokes getter', function () {
        inkManager.startInkCapture(50, 2);
        assert.isTrue(inkManager.isWriting(), 'writing must be true');
        inkManager.continueInkCapture(60, 8);
        assert.isTrue(inkManager.isWriting(), 'writing must be true');
        inkManager.endInkCapture();
        assert.isFalse(inkManager.isWriting(), 'writing must be false');

        expect(inkManager.getStrokes().length).to.equal(1);
        expect(inkManager.getStrokes()[inkManager.getStrokes().length - 1]).to.deep.equal(inkManager.getCurrentStroke());
    });

    it('InkManager Undo/redo Stack getter', function () {
        assert.equal(inkManager.getStrokes().length, 1, 'There is one stroke on strokes array');
        var stroke = inkManager.getStrokes()[inkManager.getStrokes().length - 1];

        inkManager.undo();

        expect(inkManager.getUndoRedoStack().length).to.equal(1);
        expect(inkManager.getUndoRedoStack()[inkManager.getUndoRedoStack().length - 1]).to.deep.equal(stroke);
    });

    it('InkManager clear Undo/redo Stack', function () {
        inkManager.clearUndoRedoStack();

        expect(inkManager.getUndoRedoStack().length).to.equal(0);
        expect(inkManager.getUndoRedoStack()).to.be.empty;
    });

    it('InkManager copy', function () {
        var copyStrokes = [];
        // add one stroke
        inkManager.startInkCapture(50, 2);
        inkManager.continueInkCapture(60, 8);
        inkManager.endInkCapture();
        // add one stroke
        inkManager.startInkCapture(86, 4);
        inkManager.continueInkCapture(144, 7);
        inkManager.endInkCapture();
        assert.equal(inkManager.getStrokes().length, 2, 'There is two strokes on strokes array');

        inkManager.copy(copyStrokes, 0);

        expect(inkManager.getStrokes()).to.deep.equal(copyStrokes);
    });
});