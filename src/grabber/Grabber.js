'use strict';

(function(scope) {
  function Grabber() {
    this.type = "Grabber";
  }

  Grabber.create = function (options){
      return Object.create(scope.PepjsGrabber.prototype);
  }
  scope.Grabber = Grabber;

})(MyScript)