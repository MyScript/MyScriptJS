import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as InkModel from '../../../../src/model/InkModel';
import * as UndoRedoManager from '../../../../src/model/UndoRedoManager';
import * as MyScriptJSOptions from '../../../../src/configuration/MyScriptJSOptions';

describe('Check undo/redo manager', () => {
  const model = InkModel.createModel();
  const parameters = MyScriptJSOptions.overrideDefaultOptions();
  const undoRedoManager = UndoRedoManager.createUndoRedoManager(parameters);

  it('Should be empty', () => {
    assert.lengthOf(undoRedoManager.stack, 0);
    assert.equal(undoRedoManager.currentPosition, -1);
    assert.isFalse(UndoRedoManager.getState(undoRedoManager).canClear);
    assert.isFalse(UndoRedoManager.getState(undoRedoManager).canUndo);
    assert.isFalse(UndoRedoManager.getState(undoRedoManager).canRedo);
  });

  const count = 24;
  it(`Should add ${count} models in stack`, () => {
    for (let i = 0; i < count; i++) {
      UndoRedoManager.pushModel(undoRedoManager, model);
    }
    assert.lengthOf(undoRedoManager.stack, parameters.undoRedoMaxStackSize);
    assert.equal(undoRedoManager.currentPosition, parameters.undoRedoMaxStackSize - 1);
    assert.isTrue(UndoRedoManager.getState(undoRedoManager).canClear);
    assert.isTrue(UndoRedoManager.getState(undoRedoManager).canUndo);
    assert.isFalse(UndoRedoManager.getState(undoRedoManager).canRedo);
  });

  it(`Should undo and update current position to ${parameters.undoRedoMaxStackSize}`, () => {
    UndoRedoManager.undo(undoRedoManager).then(() => {
      assert.lengthOf(undoRedoManager.stack, parameters.undoRedoMaxStackSize);
      assert.equal(undoRedoManager.currentPosition, parameters.undoRedoMaxStackSize - 2);
      assert.isTrue(UndoRedoManager.getState(undoRedoManager).canClear);
      assert.isTrue(UndoRedoManager.getState(undoRedoManager).canUndo, 'We should be able to undo again');
      assert.isTrue(UndoRedoManager.getState(undoRedoManager).canRedo);
    });
  });

  it(`Should redo and update current position to ${parameters.undoRedoMaxStackSize}`, () => {
    UndoRedoManager.redo(undoRedoManager).then(() => {
      assert.lengthOf(undoRedoManager.stack, parameters.undoRedoMaxStackSize);
      assert.equal(undoRedoManager.currentPosition, parameters.undoRedoMaxStackSize - 1);
      assert.isTrue(UndoRedoManager.getState(undoRedoManager).canClear);
      assert.isTrue(UndoRedoManager.getState(undoRedoManager).canUndo);
      assert.isFalse(UndoRedoManager.getState(undoRedoManager).canRedo);
    });
  });
});
