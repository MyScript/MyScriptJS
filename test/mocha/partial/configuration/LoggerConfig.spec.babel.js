import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as loggers from '../../../../new_src/configuration/LoggerConfig';


describe('Check logggers defintion and initialization', () => {
  it('module is define', () => {
    assert.notEqual(loggers, undefined);
  });
  // export {grabberLogger, inkpaperLogger, rendererLogger, modelLogger, recognizerLogger, testLogger};

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
});
