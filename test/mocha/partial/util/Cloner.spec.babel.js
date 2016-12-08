import { describe, it } from 'mocha';
import { assert } from 'chai';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import cloneJSObject from '../../../../src/util/Cloner';

describe('Testing the cloner', () => {
  it('Testing a basic clone', () => {
    const sourceObject2 = { test: 'object' };
    const clonedObject = cloneJSObject(sourceObject2);
    logger.debug(`clone of ${JSON.stringify(sourceObject2)} given ${JSON.stringify(clonedObject)} as a result`);
    assert.isDefined(clonedObject.creationTime, 'No creation time set');
    assert.isDefined(clonedObject.test, 'Cloned object do not have an attribute');
  });

  it('Testing a clone with a object fusion', () => {
    const sourceObject2 = { test: 'object' };
    const clonedObject = cloneJSObject({}, sourceObject2);
    logger.debug(`clone of {} with ${JSON.stringify(sourceObject2)} gived ${JSON.stringify(clonedObject)} as a result`);
    assert.isDefined(clonedObject.creationTime, 'No creation time set');
    assert.isDefined(clonedObject.test, 'Cloned object do not have an attribute');
  });
});
