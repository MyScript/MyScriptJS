'use strict';

describe('InkManager: common/inkManager.js', function () {

    describe('Default construction', function () {

        var inkManager;
        before(function (done) {
            inkManager = new MyScript.InkManager();
            done();
        });

        it('Check initial state', function () {
            expect(inkManager).to.be.an('object');
            expect(inkManager).to.be.an.instanceOf(MyScript.InkManager);
            expect(inkManager).to.have.ownProperty('writing');
            expect(inkManager).to.have.ownProperty('strokes');
            expect(inkManager).to.have.ownProperty('currentStroke');
            expect(inkManager).to.have.ownProperty('undoRedoStack');
            expect(inkManager.isWriting()).to.be.an('boolean');
            expect(inkManager.isWriting()).to.equal(false);
            expect(inkManager.isEmpty()).to.be.true;
            expect(inkManager.getCurrentStroke()).to.be.null;
        });

    });

    describe('Workflow', function () {

        var inkManager;
        before(function (done) {
            inkManager = new MyScript.InkManager();
            done();
        });

        it('Is writing', function () {
            expect(inkManager.isWriting()).to.be.an('boolean');
            expect(inkManager.isWriting()).to.equal(false);
        });

        it('Is empty', function () {
            expect(inkManager.isEmpty()).to.be.true;
        });

        it('Current stroke getter', function () {
            expect(inkManager.getCurrentStroke()).to.be.null;
        });

        it('Undo does nothing', function () {
            inkManager.undo();
            expect(inkManager.isEmpty()).to.be.true;
        });

        it('Start stroke writing', function () {
            inkManager.startInkCapture(50, 2);
            expect(inkManager.getCurrentStroke()).to.be.an.instanceOf(MyScript.Stroke);
            expect(inkManager.getCurrentStroke().getX()[0]).to.equal(50);
            expect(inkManager.getCurrentStroke().getY()[0]).to.equal(2);
            expect(inkManager.isWriting()).to.equal(true);
        });

        it('Continue stroke writing', function () {
            inkManager.continueInkCapture(60, 8);
            expect(inkManager.getCurrentStroke()).to.be.an.instanceOf(MyScript.Stroke);
            expect(inkManager.getCurrentStroke().getX()[1]).to.equal(60);
            expect(inkManager.getCurrentStroke().getY()[1]).to.equal(8);
            expect(inkManager.isWriting()).to.equal(true);
        });

        it('Start stroke writing fail', function () {
            expect(function () {
                inkManager.startInkCapture(60, 8);
            }).to.throw(Error);
        });

        it('End stroke writing', function () {
            inkManager.endInkCapture();
            expect(inkManager.getStrokes()[0]).to.equal(inkManager.getCurrentStroke());
            expect(inkManager.isWriting()).to.equal(false);
        });

        it('Continue stroke writing fail', function () {
            expect(function () {
                inkManager.continueInkCapture(60, 8);
            }).to.throw(Error);
        });

        it('End stroke writing fail', function () {
            expect(function () {
                inkManager.endInkCapture();
            }).to.throw(Error);
        });

        it('Has a current stroke', function () {
            expect(inkManager.getCurrentStroke()).not.to.be.null;
        });

        it('Is not empty', function () {
            expect(inkManager.isEmpty()).to.be.false;
        });

        it('Redo does nothing', function () {
            inkManager.redo();
            expect(inkManager.isRedoEmpty()).to.be.true;
        });

        it('Is redo empty', function () {
            expect(inkManager.isRedoEmpty()).to.be.true;
        });

        it('Undo', function () {
            assert.equal(inkManager.getStrokes().length, 1, 'There is one stroke on strokes array');
            var stroke = inkManager.getStrokes()[inkManager.getStrokes().length - 1];

            inkManager.undo();

            expect(inkManager.getUndoRedoStack().length).to.equal(1);
            expect(inkManager.getStrokes().length).to.equal(0);
            expect(stroke).to.deep.equal(inkManager.getUndoRedoStack()[inkManager.getUndoRedoStack().length - 1]);
        });

        it('Is redo not empty', function () {
            expect(inkManager.isRedoEmpty()).to.be.false;
        });

        it('Redo', function () {
            assert.equal(inkManager.getStrokes().length, 0, 'There is no stroke on strokes array');
            var stroke = inkManager.getUndoRedoStack()[inkManager.getUndoRedoStack().length - 1];

            inkManager.redo();

            expect(inkManager.getUndoRedoStack().length).to.equal(0);
            expect(inkManager.getStrokes().length).to.equal(1);
            expect(stroke).to.deep.equal(inkManager.getStrokes()[inkManager.getStrokes().length - 1]);

        });

        it('Clear', function () {
            inkManager.clear();

            expect(inkManager.isWriting()).to.equal(false);
            expect(inkManager.getStrokes().length).to.equal(0);
            expect(inkManager.getCurrentStroke()).to.be.null;
            expect(inkManager.getUndoRedoStack().length).to.equal(0);
        });

        it('Get strokes', function () {
            inkManager.startInkCapture(50, 2);
            assert.isTrue(inkManager.isWriting(), 'writing must be true');
            inkManager.continueInkCapture(60, 8);
            assert.isTrue(inkManager.isWriting(), 'writing must be true');
            inkManager.endInkCapture();
            assert.isFalse(inkManager.isWriting(), 'writing must be false');

            expect(inkManager.getStrokes().length).to.equal(1);
            expect(inkManager.getStrokes()[inkManager.getStrokes().length - 1]).to.deep.equal(inkManager.getCurrentStroke());
        });

        it('Get undo/redo stack', function () {
            assert.equal(inkManager.getStrokes().length, 1, 'There is one stroke on strokes array');
            var stroke = inkManager.getStrokes()[inkManager.getStrokes().length - 1];

            inkManager.undo();

            expect(inkManager.getUndoRedoStack().length).to.equal(1);
            expect(inkManager.getUndoRedoStack()[inkManager.getUndoRedoStack().length - 1]).to.deep.equal(stroke);
        });

        it('Test undo/redo stack', function () {
            inkManager.redo();

            inkManager.startInkCapture(50, 2);
            inkManager.continueInkCapture(60, 8);
            inkManager.endInkCapture();

            expect(inkManager.getStrokes().length).to.equal(2);
            expect(inkManager.getUndoRedoStack().length).to.equal(0);
        });

        it('Clear Undo/redo stack', function () {
            inkManager.clearUndoRedoStack();

            expect(inkManager.getUndoRedoStack().length).to.equal(0);
            expect(inkManager.getUndoRedoStack()).to.be.empty;
        });

        it('Copy', function () {
            inkManager.clear();
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

        it('Test if stroke is properly filled', function () {
            // add one stroke
            inkManager.startInkCapture(0, 0, 1428064394);
            inkManager.continueInkCapture(0, 1, 1428064395);
            inkManager.endInkCapture();

            expect(inkManager.getCurrentStroke().getX().length).to.equal(inkManager.getCurrentStroke().getY().length);
        });

    });

});