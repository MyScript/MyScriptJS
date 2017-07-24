import { describe, it } from 'mocha';
import { assert } from 'chai';
import { configurations } from '../../../lib/configuration';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as DefaultConfiguration from '../../../../src/configuration/DefaultConfiguration';
import * as DefaultBehaviors from '../../../../src/configuration/DefaultBehaviors';

const defaultBehaviors = DefaultBehaviors.overrideDefaultBehaviors();

configurations.forEach((configuration) => {
  const currentConfiguration = DefaultConfiguration.overrideDefaultConfiguration({ recognitionParams: configuration });

  describe(`Check behaviors for API ${currentConfiguration.recognitionParams.apiVersion} ${currentConfiguration.recognitionParams.type} ${currentConfiguration.recognitionParams.protocol}`, () => {
    const behavior = defaultBehaviors.getBehaviorFromConfiguration(defaultBehaviors, currentConfiguration);

    it('grabber', () => {
      assert.isDefined(behavior.grabber, 'grabber should be defined');
    });

    it('stroker', () => {
      assert.isDefined(behavior.stroker, 'stroker should be defined');
      assert.strictEqual(behavior.stroker.getInfo().type, (currentConfiguration.recognitionParams.apiVersion === 'V3') ? 'canvas' : 'svg');
      assert.strictEqual(behavior.stroker.getInfo().apiVersion, currentConfiguration.recognitionParams.apiVersion);
    });

    it('renderer', () => {
      assert.isDefined(behavior.renderer, 'renderer should be defined');
      assert.strictEqual(behavior.renderer.getInfo().type, (currentConfiguration.recognitionParams.apiVersion === 'V3') ? 'canvas' : 'svg');
      assert.strictEqual(behavior.renderer.getInfo().apiVersion, currentConfiguration.recognitionParams.apiVersion);
    });

    it('recognizer', () => {
      assert.isDefined(behavior.recognizer, 'recognizer should be defined');
      assert.include(behavior.recognizer.getInfo().types, currentConfiguration.recognitionParams.type);
      assert.strictEqual(behavior.recognizer.getInfo().protocol, currentConfiguration.recognitionParams.protocol);
      assert.strictEqual(behavior.recognizer.getInfo().apiVersion, currentConfiguration.recognitionParams.apiVersion);
      // assert.strictEqual(defaultBehaviors.optimizedParameters.exportContentTriggerOn, trigger, `${trigger} should be the default value for ${behavior} exportContentTriggerOn`);
    });

    it('callbacks', () => {
      assert.isDefined(behavior.callbacks, 'callbacks should be defined');
    });
  });
});
