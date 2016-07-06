/**
 * Created by padewitte on 04/07/16.
 */
(function (scope) {

  function MyScriptRenderer () {

  }
  MyScriptRenderer.prototype.create = function (renderDomElement, options){
    var ret = Object.create(scope.CanvasRender.prototype);
    if(model.configuration.renderType){
      //TODO Manage different types
    } else {
      scope.CanvasRender.render(model);
    }

  }

  scope.MyScriptRenderer = MyScriptRenderer;
}(MyScript))