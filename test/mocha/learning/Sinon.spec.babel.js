import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { testLogger as logger } from '../../../target/configuration/LoggerConfig';

describe('Testing Sinon framework', () => {
  it('Mocking tests with sinon', () => {
    logger.debug('Sinon object contains : ', sinon);
    const fakeInkPaper = { penUp: sinon.spy() };
    assert.isDefined(fakeInkPaper.penUp, 'We should have a spy object defined');
    fakeInkPaper.penUp();
    assert(fakeInkPaper.penUp.calledOnce, 'The method spy was call more than once');
  });
});
