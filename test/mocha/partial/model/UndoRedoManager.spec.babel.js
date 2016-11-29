import { beforeEach, describe, it } from 'mocha';
import { assert } from 'chai';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as InkModel from '../../../../src/model/InkModel';
import * as UndoRedoManager from '../../../../src/model/UndoRedoManager';

describe('Check undo/redo manager', () => {
  const model = InkModel.createModel();
  const undoRedoManager = UndoRedoManager.createUndoRedoManager();

  it('Should be empty', () => {
    assert.lengthOf(undoRedoManager.stack, 0);
    assert.equal(undoRedoManager.currentPosition, -1);
    assert.isFalse(UndoRedoManager.canClear(undoRedoManager));
    assert.isFalse(UndoRedoManager.canUndo(undoRedoManager));
    assert.isFalse(UndoRedoManager.canRedo(undoRedoManager));
  });

  const count = 2;
  it(`Should add ${count} models in stack`, () => {
    for (let i = 0; i < count; i++) {
      UndoRedoManager.pushModel(undoRedoManager, model);
    }
    assert.lengthOf(undoRedoManager.stack, count);
    assert.equal(undoRedoManager.currentPosition, count - 1);
    assert.isTrue(UndoRedoManager.canClear(undoRedoManager));
    assert.isTrue(UndoRedoManager.canUndo(undoRedoManager));
    assert.isFalse(UndoRedoManager.canRedo(undoRedoManager));
  });

  it(`Should undo and update current position to ${count - 2}`, () => {
    UndoRedoManager.undo(undoRedoManager);
    assert.lengthOf(undoRedoManager.stack, count);
    assert.equal(undoRedoManager.currentPosition, count - 2);
    assert.isTrue(UndoRedoManager.canClear(undoRedoManager));
    assert.isFalse(UndoRedoManager.canUndo(undoRedoManager));
    assert.isTrue(UndoRedoManager.canRedo(undoRedoManager));
  });

  it(`Should redo and update current position to ${count - 1}`, () => {
    UndoRedoManager.redo(undoRedoManager);
    assert.lengthOf(undoRedoManager.stack, count);
    assert.equal(undoRedoManager.currentPosition, count - 1);
    assert.isTrue(UndoRedoManager.canClear(undoRedoManager));
    assert.isTrue(UndoRedoManager.canUndo(undoRedoManager));
    assert.isFalse(UndoRedoManager.canRedo(undoRedoManager));
  });
});
