'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('recognizer');


  function Cdkv3RestMathRecognizer () {
    this.params = {};
  }


  Cdkv3RestMathRecognizer.prototype.getAvailaibleRecognitionSlots = function(){
    var availableRecognitionTypes = {};
    availableRecognitionTypes[scope.RecognitionSlot.ON_PEN_UP] = true;
    availableRecognitionTypes[scope.RecognitionSlot.ON_DEMAND] = true;
    availableRecognitionTypes[scope.RecognitionSlot.ON_TIME_OUT] = true;
    return availableRecognitionTypes;
  }

  Cdkv3RestMathRecognizer.prototype.recognize = function (restParams, model, onRecognitionCallback, onBeautificationCallback){
      logger.debug("Launching recognition of ",model.pendingStrokes);

      if(onRecognitionCallback) {
        onRecognitionCallback();
      }
      if(onBeautificationCallback) {
        onBeautificationCallback();
      }
      return;
  }

  // Export
  scope.Cdkv3RestMathRecognizer = Cdkv3RestMathRecognizer;
})(MyScript, logging);
