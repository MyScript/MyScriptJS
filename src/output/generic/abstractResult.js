(function (scope) {

    /**
     * Abstract result
     *
     * @class AbstractResult
     * @param {Object} obj
     * @constructor
     */
    function AbstractResult (obj) {
        if (obj) {
            this.instanceId = obj.instanceId;
        }
    }

    /**
     * Get instance id
     *
     * @method getInstanceId
     * @returns {String}
     */
    AbstractResult.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    // Export
    scope.AbstractResult = AbstractResult;
})(MyScript);