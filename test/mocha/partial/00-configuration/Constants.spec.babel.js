import { describe, it } from 'mocha';
import { expect } from 'chai';
import Constants from '../../../../src/configuration/Constants';
import { testLogger } from '../../../../src/configuration/LoggerConfig';

describe('Check constants', () => {
  testLogger.debug(Constants);

  const recognitionTypes = ['TEXT', 'MATH', 'SHAPE', 'MUSIC', 'ANALYZER'];
  recognitionTypes.forEach((recognitionType) => {
    it(`Should have ${recognitionType} recognition type declared`, () => {
      expect(Constants.RecognitionType[recognitionType]).to.equal(recognitionType);
    });
  });

  const protocols = ['REST', 'WEBSOCKET'];
  protocols.forEach((protocol) => {
    it(`Should have ${protocol} protocol declared`, () => {
      expect(Constants.Protocol[protocol]).to.equal(protocol);
    });
  });

  const triggers = ['QUIET_PERIOD', 'POINTER_UP', 'DEMAND'];
  triggers.forEach((trigger) => {
    it(`Should have ${trigger} trigger declared`, () => {
      expect(Constants.Trigger[trigger]).to.equal(trigger);
    });
  });
});
