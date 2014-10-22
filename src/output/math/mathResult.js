(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MathResult (obj) {
        if (obj) {
            this.instanceId = obj.instanceId;
            this.result = new scope.MathDocument(obj.result);
        }
    }

    /**
     *
     * @returns {string}
     */
    MathResult.prototype.getInstanceId = function () {
        return this.instanceId;
    };

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