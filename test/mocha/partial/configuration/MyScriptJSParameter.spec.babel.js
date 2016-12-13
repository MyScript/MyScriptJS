import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as MyScriptJSParameter from '../../../../src/configuration/MyScriptJSParameter';

describe('Check parameters', () => {
  const customConfiguration = {
    recognitionParams: {
      type: 'SHAPE',
      protocol: 'REST'
    }
  };

  it(`Should merge default configuration and ${JSON.stringify(customConfiguration)}`, () => {
    const parameters = MyScriptJSParameter.overrideDefaultOptions(customConfiguration);
    assert.strictEqual(parameters.recognitionParams.type, customConfiguration.recognitionParams.type, `${customConfiguration.recognitionParams.type} should be the default value for ${parameters} type`);
    assert.strictEqual(parameters.recognitionParams.protocol, customConfiguration.recognitionParams.protocol, `${customConfiguration.recognitionParams.protocol} should be the default value for ${parameters} protocol`);
    assert.isDefined(parameters.recognitionParams.server, 'recognitionParams.server should keep its default value');
  });
});
