import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as grabber from '../../../../src/grabber/PointerEventGrabber';

describe('Testing the Grabber', () => {
  it('Test event registration', () => {
    const spiedEditor = { pointerUp: sinon.spy(), configuration: { capture: true } };
    const spiedDomDocument = { addEventListener: sinon.spy() };
    logger.debug('Attaching document to spied element');
    grabber.attach(spiedDomDocument, spiedEditor);

    assert.strictEqual(spiedDomDocument.addEventListener.callCount, 6, 'Not all events have been registered');
  });

  // TODO Add some tests sending events and checking that grabber behave as expected
});
