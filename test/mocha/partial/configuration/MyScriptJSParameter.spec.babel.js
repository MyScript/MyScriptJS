import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as MyScriptJSParameter from '../../../../src/configuration/MyScriptJSParameter';
import { testLogger } from '../../../../src/configuration/LoggerConfig';

describe('MyScriptJSParameter check', () => {
  it('Testing createDefaultBehavioursFromPaperOptions', () => {
    const defaultMyScriptJSParameter = MyScriptJSParameter.enrichParametersWithDefault();
    const defaultBehaviors = MyScriptJSParameter.createDefaultBehavioursFromPaperOptions(defaultMyScriptJSParameter);
    assert.strictEqual(defaultBehaviors.optimizedParameters.triggerRecognitionOn, 'PEN_UP', 'PEN_UP should be the default value for V3_WEBSOCKET_TEXT');
  });

  it('Testing createDefaultBehavioursFromPaperOptions - MATH - WS', () => {
    const defaultMyScriptJSParameter = MyScriptJSParameter.enrichParametersWithDefault();
    defaultMyScriptJSParameter.recognitionParams.type = 'MATH';
    const defaultBehaviors = MyScriptJSParameter.createDefaultBehavioursFromPaperOptions(defaultMyScriptJSParameter);
    assert.strictEqual(defaultBehaviors.optimizedParameters.triggerRecognitionOn, 'PEN_UP', 'PEN_UP should be the default value for V3_WEBSOCKET_MATH');
  });

  it('Testing createDefaultBehavioursFromPaperOptions - MATH - REST', () => {
    const defaultMyScriptJSParameter = MyScriptJSParameter.enrichParametersWithDefault();
    defaultMyScriptJSParameter.recognitionParams.type = 'MATH';
    defaultMyScriptJSParameter.recognitionParams.protocol = 'REST';
    const defaultBehaviors = MyScriptJSParameter.createDefaultBehavioursFromPaperOptions(defaultMyScriptJSParameter);
    assert.strictEqual(defaultBehaviors.optimizedParameters.triggerRecognitionOn, 'QUIET_PERIOD', 'QUIET_PERIOD should be the default value for V3_REST_MATH');
  });
});
