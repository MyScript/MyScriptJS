export default function cloneJSObject(firstobject, secondobject) {
  if (secondobject) {
    return JSON.parse(JSON.stringify(Object.assign(firstobject, secondobject)));
  }
  const returnedObject = JSON.parse(JSON.stringify(firstobject));
  returnedObject.creationTime = new Date().getTime();
  return returnedObject;
}