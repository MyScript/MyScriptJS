import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as InkModel from '../../../../src/model/InkModel';
import * as UndoRedoContext from '../../../../src/model/UndoRedoContext';
import * as UndoRedoManager from '../../../../src/model/UndoRedoManager';
import * as MyScriptJSOptions from '../../../../src/configuration/MyScriptJSOptions';

describe('Check undo/redo manager', () => {
  const options = MyScriptJSOptions.overrideDefaultOptions();
  const undoRedoContext = UndoRedoContext.createUndoRedoContext(options);
  const maxSize = undoRedoContext.maxSize;

  it('Should be empty', () => {
    assert.lengthOf(undoRedoContext.stack, 0);
    assert.equal(undoRedoContext.currentPosition, -1);
    assert.equal(undoRedoContext.maxSize, options.undoRedoMaxStackSize);
  });

  const count = maxSize;
  it(`Should add ${count} models in stack`, (done) => {
    for (let i = 0; i < count; i++) {
      UndoRedoManager.pushModel(undoRedoContext, InkModel.createModel());
    }
    assert.lengthOf(undoRedoContext.stack, maxSize);
    assert.equal(undoRedoContext.currentPosition, maxSize - 1);
    UndoRedoManager.getModel(undoRedoContext).then((model) => {
      assert.isFalse(model.canClear, 'Wrong canClear state');
      assert.isTrue(model.canUndo, 'Wrong canUndo state');
      assert.isFalse(model.canRedo, 'Wrong canRedo state');
      done();
    }).catch(done);
  });

  it(`Should undo and update current position to ${maxSize - 2}`, (done) => {
    UndoRedoManager.undo(undoRedoContext).then((model) => {
      assert.lengthOf(undoRedoContext.stack, maxSize);
      assert.equal(undoRedoContext.currentPosition, maxSize - 2);
      assert.equal(model.canClear, model.rawStrokes.length > 0, 'Wrong canClear state');
      assert.isTrue(model.canUndo, 'Wrong canUndo state');
      assert.isTrue(model.canRedo, 'Wrong canRedo state');
      done();
    }).catch(done);
  });

  it(`Should redo and update current position to ${maxSize - 1}`, (done) => {
    UndoRedoManager.redo(undoRedoContext).then((model) => {
      assert.lengthOf(undoRedoContext.stack, maxSize);
      assert.equal(undoRedoContext.currentPosition, maxSize - 1);
      assert.equal(model.canClear, model.rawStrokes.length > 0, 'Wrong canClear state');
      assert.isTrue(model.canUndo, 'Wrong canUndo state');
      assert.isFalse(model.canRedo, 'Wrong canRedo state');
      done();
    }).catch(done);
  });
});
