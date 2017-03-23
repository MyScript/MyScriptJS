import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as DefaultConfiguration from '../../../../src/configuration/DefaultConfiguration';
import * as DefaultBehaviors from '../../../../src/configuration/DefaultBehaviors';

const defaultBehaviors = DefaultConfiguration.overrideDefaultConfiguration();

describe('Check behaviors', () => {
  const configurations = [{
    type: 'TEXT',
    protocol: 'REST',
    apiVersion: 'V3',
  }, {
    type: 'MATH',
    protocol: 'REST',
    apiVersion: 'V3',
  }, {
    type: 'SHAPE',
    protocol: 'REST',
    apiVersion: 'V3',
  }, {
    type: 'MUSIC',
    protocol: 'REST',
    apiVersion: 'V3',
  }, {
    type: 'ANALYZER',
    protocol: 'REST',
    apiVersion: 'V3',
  }, {
    type: 'TEXT',
    protocol: 'WEBSOCKET',
    apiVersion: 'V3',
  }, {
    type: 'MATH',
    protocol: 'WEBSOCKET',
    apiVersion: 'V3',
  }, {
    type: 'TEXT',
    protocol: 'WEBSOCKET',
    apiVersion: 'V4',
  }, {
    type: 'MATH',
    protocol: 'WEBSOCKET',
    apiVersion: 'V4',
  }];

  configurations.forEach((configuration) => {
    // const behavior = defaultBehaviors.getBehaviorFromConfiguration(defaultBehaviors, { renderingParams: configuration });
    //
    // it(`Check renderer for API ${configuration.apiVersion} ${configuration.type} ${configuration.protocol} recognition`, () => {
    //   assert.isDefined(behavior.renderer, 'renderer should be defined');
    //   if (configuration.apiVersion === 'V3') {
    //     assert.strictEqual(behavior.renderer.getInfo().type, 'canvas');
    //   } else {
    //     assert.strictEqual(behavior.renderer.getInfo().type, 'svg');
    //   }
    // });

    // it(`Check recognizer for API ${configuration.apiVersion} ${configuration.type} ${configuration.protocol} recognition`, () => {
    //   assert.isDefined(behavior.recognizer, 'recognizer should be defined');
    //   assert.strictEqual(defaultBehaviors.optimizedParameters.recognitionTriggerOn, trigger, `${trigger} should be the default value for ${behavior} recognitionTriggerOn`);
    // });
  });
});
