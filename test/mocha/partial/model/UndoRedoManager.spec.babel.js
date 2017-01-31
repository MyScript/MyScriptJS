import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as InkModel from '../../../../src/model/InkModel';
import * as UndoRedoContext from '../../../../src/model/UndoRedoContext';
import * as UndoRedoManager from '../../../../src/model/UndoRedoManager';
import * as MyScriptJSOptions from '../../../../src/configuration/MyScriptJSOptions';

describe('Check undo/redo manager', () => {
  const options = MyScriptJSOptions.overrideDefaultOptions();
  const undoRedoContext = UndoRedoContext.createUndoRedoContext(options);

  it('Should be empty', () => {
    assert.lengthOf(undoRedoContext.stack, 0);
    assert.equal(undoRedoContext.currentPosition, -1);
  });

  const count = 24;
  it(`Should add ${count} models in stack`, () => {
    for (let i = 0; i < count; i++) {
      UndoRedoManager.pushModel(undoRedoContext, InkModel.createModel());
    }
    assert.lengthOf(undoRedoContext.stack, options.undoRedoMaxStackSize);
    assert.equal(undoRedoContext.currentPosition, options.undoRedoMaxStackSize - 1);
    const model = undoRedoContext.stack[undoRedoContext.currentPosition];
    assert.isTrue(model.canClear);
    assert.isTrue(model.canUndo);
    assert.isFalse(model.canRedo);
  });

  it(`Should undo and update current position to ${options.undoRedoMaxStackSize}`, () => {
    UndoRedoManager.undo(undoRedoContext).then((model) => {
      assert.lengthOf(undoRedoContext.stack, options.undoRedoMaxStackSize);
      assert.equal(undoRedoContext.currentPosition, options.undoRedoMaxStackSize - 2);
      assert.isTrue(model.canClear);
      assert.isTrue(model.canUndo, 'We should be able to undo again');
      assert.isTrue(model.canRedo);
    });
  });

  it(`Should redo and update current position to ${options.undoRedoMaxStackSize}`, () => {
    UndoRedoManager.redo(undoRedoContext).then((model) => {
      assert.lengthOf(undoRedoContext.stack, options.undoRedoMaxStackSize);
      assert.equal(undoRedoContext.currentPosition, options.undoRedoMaxStackSize - 1);
      assert.isTrue(model.canClear);
      assert.isTrue(model.canUndo);
      assert.isFalse(model.canRedo);
    });
  });
});
