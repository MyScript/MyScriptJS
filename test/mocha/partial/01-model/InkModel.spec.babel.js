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
      assert.property(model, 'state');
      assert.propertyVal(model, 'state', 'INITIALIZING');
      assert.property(model, 'currentStroke');
      assert.property(model, 'rawStrokes');
      assert.property(model, 'lastPositions');
      assert.deepProperty(model, 'lastPositions.lastSentPosition');
      assert.deepProperty(model, 'lastPositions.lastReceivedPosition');
      assert.property(model, 'defaultSymbols');
      assert.property(model, 'recognizedSymbols');
      assert.deepProperty(model, 'rawResults.convert');
      assert.deepProperty(model, 'rawResults.state');
      assert.deepProperty(model, 'rawResults.exports');
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

    it('Creating a 01-model and update pending strokes', () => {
      const updatedModel1 = InkModel.initPendingStroke(model, { x: 1, y: 1 });
      const updatedModel2 = InkModel.appendToPendingStroke(updatedModel1, { x: 2, y: 2 });
      const updatedModel3 = InkModel.appendToPendingStroke(updatedModel2, { x: 3, y: 3 });
      const updatedModel4 = InkModel.endPendingStroke(updatedModel3, { x: 4, y: 4 });
      logger.debug('Last 01-model is ', updatedModel4);
      assert.deepEqual(model, updatedModel4);
    });

    it('Should clone 01-model', () => {
      const copy = InkModel.cloneModel(model);
      assert.equal(model.state, copy.state);
      assert.equal(model.currentStroke, copy.currentStroke);
      assert.sameDeepMembers(model.rawStrokes, copy.rawStrokes);
      assert.equal(model.lastPositions.lastReceivedPosition, copy.lastPositions.lastReceivedPosition);
      assert.equal(model.lastPositions.lastSentPosition, copy.lastPositions.lastSentPosition);
      assert.sameDeepMembers(model.defaultSymbols, copy.defaultSymbols);
      assert.equal(model.recognizedSymbols, copy.recognizedSymbols);
      assert.equal(model.rawResults.exports, copy.rawResults.exports);
      assert.equal(model.rawResults.convert, copy.rawResults.convert);
      assert.equal(model.rawResults.state, copy.rawResults.state);
      assert.equal(model.creationTime, copy.creationTime);
    });

    it('Should merge models', () => {
      const modelToMerge = InkModel.cloneModel(model);
      modelToMerge.state = 'EXPORTED';
      modelToMerge.currentStroke = { x: 1, y: 1 };

      const mergedModel = InkModel.mergeModels(modelToMerge, model);
      assert.equal(mergedModel.state, modelToMerge.state);
      assert.equal(mergedModel.recognizedSymbols, modelToMerge.recognizedSymbols);
    });

    // TODO Test all other function
  });
});
