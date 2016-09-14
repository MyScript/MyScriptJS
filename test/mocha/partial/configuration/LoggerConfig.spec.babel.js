'use strict';
import { assert } from 'chai';
import * as loggers  from '../../../../target/configuration/LoggerConfig';
import {testLogger} from '../../../../target/configuration/LoggerConfig';



describe('Check logggers defintion and initialization', () => {

  it('module is define', () => {
    assert.notEqual(loggers, undefined);
  });
  //export {grabberLogger, inkpaperLogger, rendererLogger, modelLogger, recognizerLogger, testLogger};

  it('grabberLogger is define', () => {
    assert.notEqual(loggers.grabberLogger, undefined);
  });
  it('inkpaperLogger is define', () => {
    assert.notEqual(loggers.inkpaperLogger, undefined);
  });
  it('rendererLogger is define', () => {
    assert.notEqual(loggers.rendererLogger, undefined);
  });
  it('modelLogger is define', () => {
    assert.notEqual(loggers.modelLogger, undefined);
  });
  it('recognizerLogger is define', () => {
    assert.notEqual(loggers.recognizerLogger, undefined);
  });
  it('testLogger is define', () => {
    assert.notEqual(loggers.testLogger, undefined);
  });
  it('testLogger is define and easily loadable', () => {
    assert.notEqual(testLogger, undefined);
  });

  it('testLogger configuration is shared and effective', () => {
    testLogger.setLevel('INFO');
    assert.equal(testLogger.getLevel(), 2);
    testLogger.setLevel('DEBUG');
    assert.equal(testLogger.getLevel(), 1);
    assert.equal(testLogger.getLevel(), loggers.testLogger.getLevel())

  });
});