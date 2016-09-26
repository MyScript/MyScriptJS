export default function clone(firstobject, secondobject) {
  if (secondobject) {
    return JSON.parse(JSON.stringify(Object.assign(firstobject, secondobject)));
  }
  return JSON.parse(JSON.stringify(firstobject));
}