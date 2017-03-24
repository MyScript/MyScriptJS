import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { configurations } from '../../../lib/configuration';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import { register } from '../../../../src/EditorFacade';

const elementStub = {
  classList: {
    add: sinon.stub()
  }
};

configurations.forEach((configuration) => {
  // const editor = register(elementStub, configuration);
  //
  // describe(`Check editor settings for API ${configuration.apiVersion} ${configuration.type} ${configuration.protocol}`, () => {
  //
  //   it('configuration', () => {
  //     assert.isDefined(editor.configuration, 'configuration should be defined');
  //   });
  //
  //   it('customStyle', () => {
  //     assert.isDefined(editor.customStyle, 'customStyle should be defined');
  //   });
  // });
});
