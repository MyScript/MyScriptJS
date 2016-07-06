'use strict';

(function (scope) {
    /**
     * Point
     * {x : numeric, y : numeric, t : timestamp}
     *
     * @class Point
     * @param {Object} [obj]
     * @constructor
     */
    function Point(obj) {
        if (obj) {
            this.x = obj.x;
            this.y = obj.y;
            this.t = obj.t;
        }
    }



    // Export
    scope.Point = Point;
})(MyScript);