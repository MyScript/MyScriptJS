import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as loggers from '../../../../src/configuration/LoggerConfig';

describe('Check loggers definition and initialization', () => {
  const loggerList = ['grabber', 'inkpaper', 'renderer', 'model', 'recognizer', 'test', 'util'];

  it('module is define', () => {
    assert.notEqual(loggers, undefined);
  });

  loggerList.forEach((logger) => {
    it(`${logger}Logger is define`, () => {
      assert.notEqual(loggers[`${logger}Logger`], undefined);
    });
  });
});
