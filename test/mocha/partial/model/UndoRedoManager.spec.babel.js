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
      UndoRedoManager.updateModel(options, InkModel.createModel(options), undoRedoContext, (err, model) => {});
    }
    assert.lengthOf(undoRedoContext.stack, maxSize);
    assert.equal(undoRedoContext.currentPosition, maxSize - 1);
    UndoRedoManager.getModel(undoRedoContext, (err, model) => {
      assert.isDefined(model.rawResults.state, 'Model undo/redo state is not defined');
      assert.isFalse(model.rawResults.state.canClear, 'Wrong canClear state');
      assert.isTrue(model.rawResults.state.canUndo, 'Wrong canUndo state');
      assert.isFalse(model.rawResults.state.canRedo, 'Wrong canRedo state');
      done(err);
    });
  });

  it(`Should undo and update current position to ${maxSize - 2}`, (done) => {
    UndoRedoManager.undo(options, undefined, undoRedoContext, (err, model) => {
      assert.lengthOf(undoRedoContext.stack, maxSize);
      assert.equal(undoRedoContext.currentPosition, maxSize - 2);
      assert.isDefined(model.rawResults.state, 'Model undo/redo state is not defined');
      assert.equal(model.rawResults.state.canClear, model.rawStrokes.length > 0, 'Wrong canClear state');
      assert.isTrue(model.rawResults.state.canUndo, 'Wrong canUndo state');
      assert.isTrue(model.rawResults.state.canRedo, 'Wrong canRedo state');
      done(err);
    });
  });

  it(`Should redo and update current position to ${maxSize - 1}`, (done) => {
    UndoRedoManager.redo(options, undefined, undoRedoContext, (err, model) => {
      assert.lengthOf(undoRedoContext.stack, maxSize);
      assert.equal(undoRedoContext.currentPosition, maxSize - 1);
      assert.isDefined(model.rawResults.state, 'Model undo/redo state is not defined');
      assert.equal(model.rawResults.state.canClear, model.rawStrokes.length > 0, 'Wrong canClear state');
      assert.isTrue(model.rawResults.state.canUndo, 'Wrong canUndo state');
      assert.isFalse(model.rawResults.state.canRedo, 'Wrong canRedo state');
      done(err);
    });
  });
});
