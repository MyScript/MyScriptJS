import { beforeEach, describe, it } from 'mocha';
import { assert } from 'chai';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as InkModel from '../../../../src/model/InkModel';

describe('Testing InkModel', () => {
  const initialModel = InkModel.createModel();

  it('Creating a model and update pending strokes', () => {
    const updatedModel1 = InkModel.initPendingStroke(initialModel, { x: 1, y: 1 });
    const updatedModel2 = InkModel.appendToPendingStroke(updatedModel1, { x: 2, y: 2 });
    const updatedModel3 = InkModel.appendToPendingStroke(updatedModel2, { x: 3, y: 3 });
    const updatedModel4 = InkModel.endPendingStroke(updatedModel3, { x: 4, y: 4 });
    logger.debug('Last model is ', updatedModel4);
    assert.deepEqual(initialModel, updatedModel4);
  });

  it('Should create a copy of the model', () => {
    const copy = InkModel.cloneModel(initialModel);
    assert.equal(initialModel.state, copy.state);
    assert.equal(initialModel.currentStroke, copy.currentStroke);
    assert.equal(initialModel.currentRecognitionId, copy.currentRecognitionId);
    assert.sameDeepMembers(initialModel.pendingStrokes, copy.pendingStrokes);
    assert.equal(initialModel.lastRecognitionPositions.lastReceivedPosition, copy.lastRecognitionPositions.lastReceivedPosition);
    assert.equal(initialModel.lastRecognitionPositions.lastSendPosition, copy.lastRecognitionPositions.lastSendPosition);
    assert.sameDeepMembers(initialModel.defaultSymbols, copy.defaultSymbols);
    assert.sameDeepMembers(initialModel.recognizedSymbols, copy.recognizedSymbols);
    assert.sameDeepMembers(initialModel.rawRecognizedStrokes, copy.rawRecognizedStrokes);
    assert.equal(initialModel.rawResult, copy.rawResult);
    assert.notEqual(initialModel.creationTime, copy.creationTime);
  });

  it('Should merge models', () => {
  });

  // TODO Test all other function
});
