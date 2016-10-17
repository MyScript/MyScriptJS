import _ from 'lodash';

export default function cloneJSObject(firstobject, secondobject) {
  let returnedObject;
  if (secondobject) {
    returnedObject = _.cloneDeep(Object.assign(firstobject, secondobject));
  } else {
    returnedObject = _.cloneDeep(firstobject);
  }
  returnedObject.creationTime = Date.now();
  return returnedObject;
}
