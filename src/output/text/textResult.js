(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function TextResult (obj) {
        if (obj) {
            this.instanceId = obj.instanceId;
            this.result = new scope.TextDocument(obj.result);
        }
    }

    /**
     *
     * @returns {string}
     */
    TextResult.prototype.getInstanceId = function () {
        return this.instanceId;
    };

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