import { describe, it } from 'mocha';
import { expect } from 'chai';
import MyScriptJSConstants from '../../../../src/configuration/MyScriptJSConstants';
import { testLogger } from '../../../../src/configuration/LoggerConfig';

describe('MyScriptJS check', () => {
  it('Should have recognition types declare', () => {
    testLogger.debug(MyScriptJSConstants);
    expect(MyScriptJSConstants.RecognitionType.TEXT).to.equal('TEXT');
  });
});
