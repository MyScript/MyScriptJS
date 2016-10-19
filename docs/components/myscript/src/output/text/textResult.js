'use strict';

(function (scope) {
    /**
     * Text result
     *
     * @class TextResult
     * @extends AbstractResult
     * @param {Object} [obj]
     * @constructor
     */
    function TextResult(obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.TextDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    TextResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    TextResult.prototype.constructor = TextResult;

    // Export
    scope.TextResult = TextResult;
})(MyScript);
