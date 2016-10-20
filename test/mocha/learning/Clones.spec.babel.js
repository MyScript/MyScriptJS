import { describe, it } from 'mocha';
import { assert } from 'chai';
import _ from 'lodash';
import { testLogger as logger } from '../../../src/configuration/LoggerConfig';


function createTestingObject() {
  return { varInt: 0, varObject: { att: 'value' }, varBool: true, varString: 'oneString', varIntArray: [0, 1, 2], varStringArray: ['one', 'two', 'three'], varObjectArray: [{ one: 'test' }, { two: 'tests' }] };
}

describe('Testing the best way to clone objects', () => {

  it('Cloning with assign', () => {
    const testingObject = createTestingObject();
    logger.debug('Object under test is :', testingObject);
    const clonedWithAssign = Object.assign({}, testingObject);
    // eslint-disable-next-line eqeqeq
    assert(clonedWithAssign != testingObject, '== should return equal');
    assert(clonedWithAssign !== testingObject, '=== should return not equal');
    assert(clonedWithAssign.varObjectArray === testingObject.varObjectArray, 'object array attribute content is the same');
    assert(clonedWithAssign.varStringArray === testingObject.varStringArray, 'string array attribute content is the same');
    clonedWithAssign.varInt = 1;
    assert(clonedWithAssign.varInt !== testingObject.varInt, 'Mutate the clone do not mutate the root object');
    clonedWithAssign.varStringArray[0] = 'ONE';
    assert(clonedWithAssign.varStringArray === testingObject.varStringArray, 'Mutate string array content differs');
    clonedWithAssign.varStringArray.push('FOUR');
    assert(clonedWithAssign.varStringArray.length === testingObject.varStringArray.length, 'Array length should be different');
    // Ok we have to find something more powerfull
  });

  it('Even more fun with cloning with assign and destructuring operator', () => {
    const testingObject = createTestingObject();
    logger.debug('Object under test is :', testingObject);
    const clonedWithAssign = Object.assign({}, testingObject);
    clonedWithAssign.varStringArray = [...testingObject.varStringArray];
    clonedWithAssign.varStringArray.push('FOUR');
    assert(clonedWithAssign.varStringArray.length !== testingObject.varStringArray.length, 'Array length should be different');
    clonedWithAssign.varObjectArray = [...testingObject.varObjectArray];
    clonedWithAssign.varObjectArray.push({ three: 'tests' });
    clonedWithAssign.varObjectArray[0].one = 'no test';
    assert(clonedWithAssign.varObjectArray.length !== testingObject.varObjectArray.length, 'Array length should be different');
    assert(clonedWithAssign.varObjectArray[0] === testingObject.varObjectArray[0], 'First objects in array should be equals');
    assert(clonedWithAssign.varObjectArray[1] === testingObject.varObjectArray[1], 'Second objects in array should be equals');
    clonedWithAssign.varInt++;
    assert(clonedWithAssign.varInt !== testingObject.varInt, 'Object.assign is broken');
    clonedWithAssign.varObject.att = 'anotherValue';
    assert(clonedWithAssign.varObject === testingObject.varObject, 'Clone was deeper than expected');
    // We clone explicitly the var
    clonedWithAssign.varObject = Object.assign({}, testingObject.varObject);
    clonedWithAssign.varObject.att = 'anotherOtherValue';
    assert(clonedWithAssign.varObject !== testingObject.varObject, 'No the property ws not cloned');
  });
});
