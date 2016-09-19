'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('renderer');

  scope.CanvasRender.prototype.drawTextPrimitive = function() {
    console.log("text rendering on");
    switch (component.type) {
      case 'inputCharacter':
        logger.info("inputCharacter are not yet render");
        break;
      case 'char':
        logger.info("char are not yet render");
        break
      case 'string':
        logger.info("string are not yet render");
        break;
      default:
        break;
    }
  };


}(MyScript, logging))
