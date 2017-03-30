import { describe, it } from 'mocha';
import { expect } from 'chai';
import MyScriptJSConstants from '../../../../src/configuration/MyScriptJSConstants';
import { testLogger } from '../../../../src/configuration/LoggerConfig';

describe('Check constants', () => {
  testLogger.debug(MyScriptJSConstants);

  const recognitionTypes = ['TEXT', 'MATH', 'SHAPE', 'MUSIC', 'ANALYZER'];
  recognitionTypes.forEach((recognitionType) => {
    it(`Should have ${recognitionType} recognition type declared`, () => {
      expect(MyScriptJSConstants.RecognitionType[recognitionType]).to.equal(recognitionType);
    });
  });

  const protocols = ['REST', 'WEBSOCKET'];
  protocols.forEach((protocol) => {
    it(`Should have ${protocol} protocol declared`, () => {
      expect(MyScriptJSConstants.Protocol[protocol]).to.equal(protocol);
    });
  });

  const triggers = ['QUIET_PERIOD', 'POINTER_UP', 'DEMAND'];
  triggers.forEach((trigger) => {
    it(`Should have ${trigger} trigger declared`, () => {
      expect(MyScriptJSConstants.Trigger[trigger]).to.equal(trigger);
    });
  });
});
