import { describe, it } from 'mocha';
import { assert } from 'chai';
import { testLogger as logger } from '../../../src/configuration/LoggerConfig';
import * as InkModel from '../../../src/model/InkModel';
import * as ModelStats from '../../../src/util/ModelStats';

describe('Testing InkModel Stats', () => {
  it('Testing generated stats', () => {
    const initialModel = InkModel.createModel();
    const updatedModel1 = InkModel.initPendingStroke(initialModel, { x: 1, y: 1 });
    const updatedModel2 = InkModel.appendToPendingStroke(updatedModel1, { x: 2, y: 2 });
    const updatedModel3 = InkModel.appendToPendingStroke(updatedModel2, { x: 3, y: 3 });
    const updatedModel4 = InkModel.endPendingStroke(updatedModel3, { x: 4, y: 4 });
    logger.debug('Last model stats are ', ModelStats.computeStats(updatedModel4));
    assert.deepEqual(initialModel, updatedModel4);
  });


// TODO Test all other function
});
