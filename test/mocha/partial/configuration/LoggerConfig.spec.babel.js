import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as loggers from '../../../../src/configuration/LoggerConfig';

describe('Check loggers definition and initialization', () => {
  it('module is define', () => {
    assert.notEqual(loggers, undefined);
  });

  const loggerList = ['grabber', 'editor', 'renderer', 'model', 'recognizer', 'test', 'util'];
  loggerList.forEach((loggerName) => {
    const logger = loggers[`${loggerName}Logger`];

    it(`${loggerName}Logger is define`, () => {
      assert.notEqual(logger, undefined);
    });
  });
});
