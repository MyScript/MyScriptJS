(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AbstractResult (obj) {
        if (obj) {
            this.instanceId = obj.instanceId;
        }
    }

    /**
     *
     * @returns {String}
     */
    AbstractResult.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    // Export
    scope.AbstractResult = AbstractResult;
})(MyScript);