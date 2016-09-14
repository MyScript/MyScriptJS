'use strict';
import { assert } from 'chai';
import * as sinon from 'sinon'
import {testLogger as logger} from '../../../../target/configuration/LoggerConfig';
import * as Grabber from '../../../../target/grabber/PepjsGrabber';

describe('Testing the PepJS Grabber', () => {

  it('Test envent registration', () => {
    let spiedInkPaper = {penUp : sinon.spy()};
    let spiedDomDocument = {addEventListener : sinon.spy()};
    logger.debug('Attaching document to spied element');
    Grabber.attachEvents(spiedInkPaper, spiedDomDocument);

    assert.strictEqual(spiedDomDocument.addEventListener.callCount, 8,  "Not all events have been registred");
  })


});