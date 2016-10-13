import { describe, it, beforeEach } from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { testLogger as logger } from '../../../../new_src/configuration/LoggerConfig';
import * as grabber from '../../../../new_src/grabber/PepjsGrabber';

describe('Testing the PepJS Grabber', () => {
  it('Test event registration', () => {
    const spiedInkPaper = { penUp: sinon.spy() };
    const spiedDomDocument = { addEventListener: sinon.spy() };
    logger.debug('Attaching document to spied element');
    grabber.attachGrabberEvents(spiedInkPaper, spiedDomDocument);

    assert.strictEqual(spiedDomDocument.addEventListener.callCount, 8, 'Not all events have been registred');
  });

  // TODO Add some tests sending events and checking that graber behave as expected
});
