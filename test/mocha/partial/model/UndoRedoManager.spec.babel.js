import { beforeEach, describe, it } from 'mocha';
import { assert } from 'chai';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as InkModel from '../../../../src/model/InkModel';
import * as UndoRedoManager from '../../../../src/model/UndoRedoManager';
import * as MyScriptJSParameter from '../../../../src/configuration/MyScriptJSParameter';

describe('Check undo/redo manager', () => {
  const model = InkModel.createModel();
  const parameters = MyScriptJSParameter.enrichPaperParametersWithDefault();
  const undoRedoManager = UndoRedoManager.createUndoRedoManager(undefined, parameters);

  it('Should be empty', () => {
    assert.lengthOf(undoRedoManager.stack, 0);
    assert.equal(undoRedoManager.currentPosition, -1);
    assert.isFalse(UndoRedoManager.canClear(undoRedoManager));
    assert.isFalse(UndoRedoManager.canUndo(undoRedoManager));
    assert.isFalse(UndoRedoManager.canRedo(undoRedoManager));
  });

  const count = 24;
  it(`Should add ${count} models in stack`, () => {
    for (let i = 0; i < count; i++) {
      UndoRedoManager.pushModel(undoRedoManager, model);
    }
    assert.lengthOf(undoRedoManager.stack, parameters.undoRedoMaxStackSize);
    assert.equal(undoRedoManager.currentPosition, parameters.undoRedoMaxStackSize - 1);
    assert.isTrue(UndoRedoManager.canClear(undoRedoManager));
    assert.isTrue(UndoRedoManager.canUndo(undoRedoManager));
    assert.isFalse(UndoRedoManager.canRedo(undoRedoManager));
  });

  it(`Should undo and update current position to ${parameters.undoRedoMaxStackSize}`, () => {
    UndoRedoManager.undo(undoRedoManager);
    assert.lengthOf(undoRedoManager.stack, parameters.undoRedoMaxStackSize);
    assert.equal(undoRedoManager.currentPosition, parameters.undoRedoMaxStackSize - 2);
    assert.isTrue(UndoRedoManager.canClear(undoRedoManager));
    assert.isTrue(UndoRedoManager.canUndo(undoRedoManager), 'We should be able to undo again');
    assert.isTrue(UndoRedoManager.canRedo(undoRedoManager));
  });

  it(`Should redo and update current position to ${parameters.undoRedoMaxStackSize}`, () => {
    UndoRedoManager.redo(undoRedoManager);
    assert.lengthOf(undoRedoManager.stack, parameters.undoRedoMaxStackSize);
    assert.equal(undoRedoManager.currentPosition, parameters.undoRedoMaxStackSize - 1);
    assert.isTrue(UndoRedoManager.canClear(undoRedoManager));
    assert.isTrue(UndoRedoManager.canUndo(undoRedoManager));
    assert.isFalse(UndoRedoManager.canRedo(undoRedoManager));
  });
});
