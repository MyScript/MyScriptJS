'use strict';

(function (scope) {
    /**
     * WebSocket recognition hmac challenge message
     *
     * @class ChallengeResponseWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function ChallengeResponseWSMessage(obj) {
        scope.AbstractWSMessage.call(this, obj);
        if (obj) {
            this.challenge = obj.challenge;
        }
    }

    /**
     * Inheritance property
     */
    ChallengeResponseWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    ChallengeResponseWSMessage.prototype.constructor = ChallengeResponseWSMessage;

    /**
     * Get the challenge
     *
     * @method getChallenge
     * @returns {String}
     */
    ChallengeResponseWSMessage.prototype.getChallenge = function () {
        return this.challenge;
    };

    // Export
    scope.ChallengeResponseWSMessage = ChallengeResponseWSMessage;
})(MyScript);