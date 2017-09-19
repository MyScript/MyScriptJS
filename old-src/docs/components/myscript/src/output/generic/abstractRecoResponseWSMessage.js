'use strict';

(function (scope) {
    /**
     * WebSocket recognition text result message
     *
     * @class AbstractRecoResponseWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function AbstractRecoResponseWSMessage(obj) {
        scope.AbstractWSMessage.call(this, obj);
        if (obj) {
            this.instanceId = obj.instanceId;
        }
    }

    /**
     * Inheritance property
     */
    AbstractRecoResponseWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    AbstractRecoResponseWSMessage.prototype.constructor = AbstractRecoResponseWSMessage;

    /**
     * Get instance id
     *
     * @method getInstanceId
     * @returns {String}
     */
    AbstractRecoResponseWSMessage.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     * Get document
     *
     * @method getDocument
     * @returns {TextDocument|ShapeDocument|MathDocument|MusicDocument|AnalyzerDocument}
     */
    AbstractRecoResponseWSMessage.prototype.getDocument = function () {
        return this.result;
    };

    // Export
    scope.AbstractRecoResponseWSMessage = AbstractRecoResponseWSMessage;
})(MyScript);