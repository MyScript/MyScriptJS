import { beforeEach, describe, it } from 'mocha';
import { assert } from 'chai';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as InkModel from '../../../../src/model/InkModel';
import * as Point from '../../../../src/model/Point';

describe('Testing InkModel', () => {
  it('Creating a model and update pending strokes', () => {
    const initialModel = InkModel.createModel();
    const updatedModel1 = InkModel.initPendingStroke(initialModel, Point.createPoint(1, 1));
    const updatedModel2 = InkModel.appendToPendingStroke(updatedModel1, Point.createPoint(2, 2));
    const updatedModel3 = InkModel.appendToPendingStroke(updatedModel2, Point.createPoint(3, 3));
    const updatedModel4 = InkModel.endPendingStroke(updatedModel3, Point.createPoint(4, 4));
    logger.debug('Last model is ', updatedModel4);
    assert.deepEqual(initialModel, updatedModel4);
  });


  // TODO Test all other function
});
