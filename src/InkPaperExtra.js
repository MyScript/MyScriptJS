'use strict';

(function (scope, logging) {

  var logger = logging.getLogger('inkpaper');
  var InkPaper = scope.InkPaper;

  /**
   * FIXME
   * Return the stats allowing to monitor what ink size is send to the server.
   * @returns Stats objects format {strokesCount : 0, pointsCount : 0, byteSize : 0, humanSize : 0, humanUnit : 'BYTE'} humanUnit could have the values BYTE, BYTES, KiB, MiB
   */
  InkPaper.prototype.getStats = function () {
    var stats = {strokesCount: 0, pointsCount: 0, byteSize: 0, humanSize: 0, humanUnit: 'BYTE'};
    if (this._components) {
      stats.strokesCount = this._components.length;
      var pointsCount = 0;
      for (var strokeNb = 0; strokeNb < this._components.length; strokeNb++) {
        pointsCount = pointsCount + this._components[strokeNb].x.length;
      }
      stats.strokesCount = this._components.length;
      stats.pointsCount = pointsCount;
      //We start with 270 as it is the size in bytes. Make a real computation implies to recode a doRecogntion
      var byteSize = 270;
      byteSize = JSON.stringify(this._components).length;
      stats.byteSize = byteSize;
      if (byteSize < 270) {
        stats.humanUnit = 'BYTE';
        stats.byteSize = 0;
        stats.humanSize = 0;
      } else if (byteSize < 2048) {
        stats.humanUnit = 'BYTES';
        stats.humanSize = byteSize;
      } else if (byteSize < 1024 * 1024) {
        stats.humanUnit = 'KiB';
        stats.humanSize = (byteSize / 1024).toFixed(2);
      } else {
        stats.humanUnit = 'MiB';
        stats.humanSize = (byteSize / 1024 / 1024).toFixed(2);
      }
    }
    return stats;
  };

  /**
   * Set the width
   *
   * @method setWidth
   * @param {Number} width
   */
  InkPaper.prototype.updateCanvasSizeToParentOne = function () {
    this.renderer.updateCanvasSizeToParentOne(this.domElement, this.renderingStructure, this.model, this.stroker);
  };



})(MyScript, logging);
