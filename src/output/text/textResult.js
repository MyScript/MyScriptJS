(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function TextResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.TextDocument(obj.result);
        }
    }

    /**
     *
     * @type {MyScript.AbstractResult}
     */
    TextResult.prototype = new scope.AbstractResult();

    /**
     *
     * @type {TextResult}
     */
    TextResult.prototype.constructor = TextResult;

    /**
     *
     * @returns {TextDocument}
     */
    TextResult.prototype.getTextDocument = function () {
        return this.result;
    };

    // Export
    scope.TextResult = TextResult;
})(MyScript);