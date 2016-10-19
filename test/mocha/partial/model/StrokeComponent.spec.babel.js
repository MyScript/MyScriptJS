import { beforeEach, describe, it } from 'mocha';
import { assert } from 'chai';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as StrokeComponent from '../../../../src/model/StrokeComponent';

describe('Testing StrokeComponent', () => {
  let fullStroke;

  const defaultStroke = {
    type: 'stroke',
    x: [],
    y: [],
    t: [],
    p: [],
    d: [],
    l: []
  };

  beforeEach(() => {
    fullStroke = StrokeComponent.createStrokeComponent({ x: [10, 20], y: [30, 40] });
  });

  it('Create an default stroke', () => {
    const stroke = StrokeComponent.createStrokeComponent();
    logger.debug('Empty object', stroke);
    assert.deepEqual(stroke, defaultStroke, 'Default StrokeComponent is not shape as expected');
  });

  it('Create an stroke with x and y already defined', () => {
    logger.debug('Empty object', defaultStroke);
    assert.notDeepEqual(fullStroke, defaultStroke, 'Maybe some reference are shared during Stroke component initialization');
    const expectedStroke = Object.assign({ x: [10, 20], y: [30, 40] }, defaultStroke);
    assert.notDeepEqual(fullStroke, expectedStroke, 'Stroke created from another is not as expected');
  });

  it('Computing length of stroke', () => {
    assert.equal(2, StrokeComponent.getLength(fullStroke), 'Length of stroke is not as expected');
  });

  // TODO Test all other function
});
