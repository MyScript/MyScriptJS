var iterateOverAttribute = function (objectToUse, functionToRun){
  for (var property in objectToUse) {
    if (objectToUse.hasOwnProperty(property) && objectToUse[property]) {
      functionToRun(objectToUse[property]);
    }
  }
};
