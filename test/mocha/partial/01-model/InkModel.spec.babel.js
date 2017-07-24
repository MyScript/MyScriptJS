import { beforeEach, describe, it } from 'mocha';
import { assert } from 'chai';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as InkModel from '../../../../src/model/InkModel';

describe('Testing InkModel', () => {
  describe('constructor', () => {
    let param;
    let model;

    beforeEach(() => {
      model = InkModel.createModel(param);
    });

    it('Check mandatory properties', () => {
      assert.property(model, 'currentStroke');
      assert.property(model, 'rawStrokes');
      assert.property(model, 'lastPositions');
      assert.nestedProperty(model, 'lastPositions.lastSentPosition');
      assert.nestedProperty(model, 'lastPositions.lastReceivedPosition');
      assert.property(model, 'defaultSymbols');
      assert.property(model, 'recognizedSymbols');
      assert.nestedProperty(model, 'rawResults.convert');
      assert.nestedProperty(model, 'rawResults.exports');
      assert.property(model, 'creationTime');
      assert.property(model, 'modificationTime');
    });

    param = { recognitionParams: { type: 'MUSIC', v3: { musicParameter: { divisions: 480, staff: { top: 100, count: 5, gap: 20 }, clef: { symbol: 'G', octave: 0, line: 2 } } } } };
    const defaultMusicSymbols = [{ type: 'staff', top: 100, count: 5, gap: 20 }, { type: 'clef', value: { symbol: 'G', octave: 0, yAnchor: 160 }, boundingBox: { height: 150, width: 56.25, x: 0, y: 70 } }];
    it(`Check defaultSymbols for ${JSON.stringify(param)}`, () => {
      assert.deepEqual(model.defaultSymbols, defaultMusicSymbols);
    });
  });
  describe('workflow', () => {
    const model = InkModel.createModel();

    it('Creating a model and update pending strokes', () => {
      const updatedModel1 = InkModel.initPendingStroke(model, { x: 1, y: 1 });
      const updatedModel2 = InkModel.appendToPendingStroke(updatedModel1, { x: 2, y: 2 });
      const updatedModel3 = InkModel.appendToPendingStroke(updatedModel2, { x: 3, y: 3 });
      const updatedModel4 = InkModel.endPendingStroke(updatedModel3, { x: 4, y: 4 });
      logger.debug('Last model is ', updatedModel4);
      assert.deepEqual(model, updatedModel4);
    });

    it('Should clone model', () => {
      const copy = InkModel.cloneModel(model);
      assert.equal(model.currentStroke, copy.currentStroke);
      assert.sameDeepMembers(model.rawStrokes, copy.rawStrokes);
      assert.equal(model.lastPositions.lastReceivedPosition, copy.lastPositions.lastReceivedPosition);
      assert.equal(model.lastPositions.lastSentPosition, copy.lastPositions.lastSentPosition);
      assert.sameDeepMembers(model.defaultSymbols, copy.defaultSymbols);
      assert.equal(model.recognizedSymbols, copy.recognizedSymbols);
      assert.equal(model.rawResults.exports, copy.rawResults.exports);
      assert.equal(model.rawResults.convert, copy.rawResults.convert);
      assert.equal(model.creationTime, copy.creationTime);
    });

    it('Should merge models', () => {
      const modelToMerge = InkModel.cloneModel(model);
      modelToMerge.currentStroke = { x: 1, y: 1 };

      const mergedModel = InkModel.mergeModels(modelToMerge, model);
      assert.equal(mergedModel.recognizedSymbols, modelToMerge.recognizedSymbols);
    });

    // TODO Test all other function
  });
});
