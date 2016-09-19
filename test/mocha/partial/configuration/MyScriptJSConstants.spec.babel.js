import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as MyScriptJSConstants from '../../../../new_src/configuration/MyScriptJSConstants';
import { testLogger } from '../../../../new_src/configuration/LoggerConfig';

describe('MyScriptJS check', () => {
  it('Should have recognition types declare', () => {
    testLogger.debug(MyScriptJSConstants);
    expect(MyScriptJSConstants.RecognitionType.TEXT).to.equal('TEXT');
  });
});
