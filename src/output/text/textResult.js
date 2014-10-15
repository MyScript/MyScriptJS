/**
 *
 * @param scope
 */
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
    TextResult.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {TextResult}
     */
    scope.TextResult = TextResult;
})(MyScript);