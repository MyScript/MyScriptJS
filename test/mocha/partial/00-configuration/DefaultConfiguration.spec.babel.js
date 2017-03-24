import { describe, it } from 'mocha';
import { assert } from 'chai';
import { configurations } from '../../../lib/configuration';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as DefaultConfiguration from '../../../../src/configuration/DefaultConfiguration';

configurations.forEach((configuration) => {
  describe(`Check configuration for API ${configuration.apiVersion} ${configuration.type} ${configuration.protocol}`, () => {
    const currentConfiguration = DefaultConfiguration.overrideDefaultConfiguration({ recognitionParams: configuration });

    it('type', () => {
      assert.isDefined(currentConfiguration.recognitionParams.type, 'type should be defined');
      assert.strictEqual(currentConfiguration.recognitionParams.type, configuration.type, `${currentConfiguration.recognitionParams.type} should be the default value for type`);
    });

    it('protocol', () => {
      assert.isDefined(currentConfiguration.recognitionParams.protocol, 'protocol should be defined');
      assert.strictEqual(currentConfiguration.recognitionParams.protocol, configuration.protocol, `${currentConfiguration.recognitionParams.protocol} should be the default value for protocol`);
    });

    it('apiVersion', () => {
      assert.isDefined(currentConfiguration.recognitionParams.apiVersion, 'apiVersion should be defined');
      assert.strictEqual(currentConfiguration.recognitionParams.apiVersion, configuration.apiVersion, `${currentConfiguration.recognitionParams.apiVersion} should be the default value for apiVersion`);
    });

    it('server', () => {
      assert.isDefined(currentConfiguration.recognitionParams.server, 'recognitionParams.server should keep its default value');
    });
  });
});
