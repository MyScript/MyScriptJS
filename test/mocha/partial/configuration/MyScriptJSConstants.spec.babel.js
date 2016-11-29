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

  const inputModes = ['CURSIVE', 'ISOLATED', 'SUPERIMPOSED', 'VERTICAL'];
  inputModes.forEach((inputMode) => {
    it(`Should have ${inputMode} input mode declared`, () => {
      expect(MyScriptJSConstants.InputMode[inputMode]).to.equal(inputMode);
    });
  });

  const inputTypes = ['CHAR', 'WORD', 'SINGLE_LINE_TEXT', 'MULTI_LINE_TEXT'];
  inputTypes.forEach((inputType) => {
    it(`Should have ${inputType} input type declared`, () => {
      expect(MyScriptJSConstants.InputType[inputType]).to.equal(inputType);
    });
  });
});
