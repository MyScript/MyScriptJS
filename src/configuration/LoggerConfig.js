'use strict';
var logging = log.noConflict();
(function(logging) {
  logging.setDefaultLevel("INFO");
  logging.setLevel("INFO");
  //logging.getLogger('grabber').setLevel("error");

  // TRACE
  // DEBUG
  // INFO
  // ERROR

  logging.getLogger('grabber').setLevel("INFO");
  logging.getLogger('inkpaper').setLevel("INFO");
  logging.getLogger('renderer').setLevel("INFO");
  logging.getLogger('model').setLevel("INFO");
  logging.getLogger('recognizer').setLevel("DEBUG");

})(logging);