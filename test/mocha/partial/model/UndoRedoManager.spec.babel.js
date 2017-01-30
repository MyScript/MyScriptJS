import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as InkModel from '../../../../src/model/InkModel';
import * as UndoRedoManager from '../../../../src/model/UndoRedoManager';
import * as MyScriptJSOptions from '../../../../src/configuration/MyScriptJSOptions';

describe('Check undo/redo manager', () => {
  const model = InkModel.createModel();
  const parameters = MyScriptJSOptions.overrideDefaultOptions();
  const undoRedoContext = UndoRedoManager.createUndoRedoContext(parameters);

  it('Should be empty', () => {
    assert.lengthOf(undoRedoContext.stack, 0);
    assert.equal(undoRedoContext.currentPosition, -1);
    assert.isFalse(UndoRedoManager.getState(undoRedoContext).canClear);
    assert.isFalse(UndoRedoManager.getState(undoRedoContext).canUndo);
    assert.isFalse(UndoRedoManager.getState(undoRedoContext).canRedo);
  });

  const count = 24;
  it(`Should add ${count} models in stack`, () => {
    for (let i = 0; i < count; i++) {
      UndoRedoManager.pushModel(undoRedoContext, model);
    }
    assert.lengthOf(undoRedoContext.stack, parameters.undoRedoMaxStackSize);
    assert.equal(undoRedoContext.currentPosition, parameters.undoRedoMaxStackSize - 1);
    assert.isTrue(UndoRedoManager.getState(undoRedoContext).canClear);
    assert.isTrue(UndoRedoManager.getState(undoRedoContext).canUndo);
    assert.isFalse(UndoRedoManager.getState(undoRedoContext).canRedo);
  });

  it(`Should undo and update current position to ${parameters.undoRedoMaxStackSize}`, () => {
    UndoRedoManager.undo(undoRedoContext).then(() => {
      assert.lengthOf(undoRedoContext.stack, parameters.undoRedoMaxStackSize);
      assert.equal(undoRedoContext.currentPosition, parameters.undoRedoMaxStackSize - 2);
      assert.isTrue(UndoRedoManager.getState(undoRedoContext).canClear);
      assert.isTrue(UndoRedoManager.getState(undoRedoContext).canUndo, 'We should be able to undo again');
      assert.isTrue(UndoRedoManager.getState(undoRedoContext).canRedo);
    });
  });

  it(`Should redo and update current position to ${parameters.undoRedoMaxStackSize}`, () => {
    UndoRedoManager.redo(undoRedoContext).then(() => {
      assert.lengthOf(undoRedoContext.stack, parameters.undoRedoMaxStackSize);
      assert.equal(undoRedoContext.currentPosition, parameters.undoRedoMaxStackSize - 1);
      assert.isTrue(UndoRedoManager.getState(undoRedoContext).canClear);
      assert.isTrue(UndoRedoManager.getState(undoRedoContext).canUndo);
      assert.isFalse(UndoRedoManager.getState(undoRedoContext).canRedo);
    });
  });
});
