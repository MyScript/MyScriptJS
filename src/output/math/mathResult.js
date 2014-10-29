(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.MathDocument(obj.result);
        }
    }

    /**
     *
     * @type {MyScript.AbstractResult}
     */
    MathResult.prototype = new scope.AbstractResult();

    /**
     *
     * @type {MathResult}
     */
    MathResult.prototype.constructor = MathResult;

    /**
     *
     * @returns {MathDocument}
     */
    MathResult.prototype.getMathDocument = function () {
        return this.result;
    };

    // Export
    scope.MathResult = MathResult;
})(MyScript);