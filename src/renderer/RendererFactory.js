/**
 * Created by padewitte on 04/07/16.
 */
(function (scope, logging) {
  var logger = logging.getLogger('renderer');

  function RendererFactory () {

  }
  RendererFactory.create = function (type){
    logger.debug("Creating a renderer ", type);
    if("canvas" === type){
      return Object.create(scope.CanvasRender.prototype);
    } else {
      var ret =  Object.create(scope.CanvasRender.prototype);
      ret.drawShapePrimitive = function (){
        logger.debug('Just wanted to trie my customized renderer')
      }
    }
    return ret;
  };

  scope.RendererFactory = RendererFactory;
}(MyScript, logging));