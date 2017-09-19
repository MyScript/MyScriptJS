'use strict';

(function (scope) {
    /**
     * Math result
     *
     * @class MathResult
     * @extends AbstractResult
     * @param {Object} [obj]
     * @constructor
     */
    function MathResult(obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.MathDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    MathResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    MathResult.prototype.constructor = MathResult;

    // Export
    scope.MathResult = MathResult;
})(MyScript);
