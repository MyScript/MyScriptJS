import { describe, it } from 'mocha';
import { expect } from 'chai';
import { MyScript } from '../../../target/MyScript';
import { testLogger } from '../../../target/configuration/LoggerConfig';

describe('MyScriptJS check', () => {
  it('Should have recognition types declare', () => {
    testLogger.debug(MyScript);
    expect(MyScript.RecognitionType.TEXT).to.equal('TEXT');
  });
});
