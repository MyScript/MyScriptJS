import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as InkModel from '../../../../src/model/InkModel';
import * as UndoRedoContext from '../../../../src/model/UndoRedoContext';
import * as UndoRedoManager from '../../../../src/model/UndoRedoManager';
import * as DefaultConfiguration from '../../../../src/configuration/DefaultConfiguration';

describe('Check undo/redo manager', () => {
  const configuration = DefaultConfiguration.overrideDefaultConfiguration();
  const undoRedoContext = UndoRedoContext.createUndoRedoContext(configuration);
  const maxSize = undoRedoContext.maxSize;

  it('Should be empty', () => {
    assert.lengthOf(undoRedoContext.stack, 0);
    assert.equal(undoRedoContext.currentPosition, -1);
    assert.equal(undoRedoContext.maxSize, configuration.undoRedoMaxStackSize);
  });

  const count = maxSize;
  it(`Should add ${count} models in stack`, (done) => {
    for (let i = 0; i < count; i++) {
      UndoRedoManager.updateModel(undoRedoContext, InkModel.createModel(configuration), (err, model) => {});
    }
    assert.lengthOf(undoRedoContext.stack, maxSize);
    assert.equal(undoRedoContext.currentPosition, maxSize - 1);
    UndoRedoManager.getModel(undoRedoContext, (err, model) => {
      assert.isTrue(undoRedoContext.canUndo, 'Wrong canUndo state');
      assert.isFalse(undoRedoContext.canRedo, 'Wrong canRedo state');
      done(err);
    });
  });

  it(`Should undo and update current index to ${maxSize - 2}`, (done) => {
    UndoRedoManager.undo(undoRedoContext, undefined, (err, model) => {
      assert.lengthOf(undoRedoContext.stack, maxSize);
      assert.equal(undoRedoContext.currentPosition, maxSize - 2);
      assert.isTrue(undoRedoContext.canUndo, 'Wrong canUndo state');
      assert.isTrue(undoRedoContext.canRedo, 'Wrong canRedo state');
      done(err);
    });
  });

  it(`Should redo and update current index to ${maxSize - 1}`, (done) => {
    UndoRedoManager.redo(undoRedoContext, undefined, (err, model) => {
      assert.lengthOf(undoRedoContext.stack, maxSize);
      assert.equal(undoRedoContext.currentPosition, maxSize - 1);
      assert.isTrue(undoRedoContext.canUndo, 'Wrong canUndo state');
      assert.isFalse(undoRedoContext.canRedo, 'Wrong canRedo state');
      done(err);
    });
  });
});
