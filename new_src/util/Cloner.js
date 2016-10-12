export default function cloneJSObject(firstobject, secondobject) {
  let returnedObject;
  if (secondobject) {
    returnedObject = JSON.parse(JSON.stringify(Object.assign(firstobject, secondobject)));
  } else {
    returnedObject = JSON.parse(JSON.stringify(firstobject));
  }
  returnedObject.creationTime = Date.now();
  return returnedObject;
}
