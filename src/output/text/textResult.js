(function (scope) {

    /**
     *
     * @constructor
     */
    function TextResult () {
        this.instanceId = null;
        this.result = null;
    }

    /**
     *
     * @type {Object}
     */
    TextResult.prototype.__proto__ = new Object();

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