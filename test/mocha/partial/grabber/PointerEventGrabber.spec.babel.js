import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as grabber from '../../../../src/grabber/PointerEventGrabber';

describe('Testing the Grabber', () => {
  it('Test event registration', () => {
    const spiedInkPaper = { pointerUp: sinon.spy() };
    const spiedDomDocument = { addEventListener: sinon.spy() };
    logger.debug('Attaching document to spied element');
    grabber.attachEvents(spiedInkPaper, spiedDomDocument);

    assert.strictEqual(spiedDomDocument.addEventListener.callCount, 8, 'Not all events have been registered');
  });

  // TODO Add some tests sending events and checking that grabber behave as expected
});
