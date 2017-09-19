'use strict';

(function (scope) {
    /**
     * WebSocket recognition hmac challenge message
     *
     * @class ChallengeRequestWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function ChallengeRequestWSMessage(obj) {
        this.type = 'hmac';
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ChallengeRequestWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    ChallengeRequestWSMessage.prototype.constructor = ChallengeRequestWSMessage;

    /**
     * Get the challenge
     *
     * @method getChallenge
     * @returns {String}
     */
    ChallengeRequestWSMessage.prototype.getChallenge = function () {
        return this.challenge;
    };

    /**
     * Set the challenge
     *
     * @method setChallenge
     * @param {String} challenge
     */
    ChallengeRequestWSMessage.prototype.setChallenge = function (challenge) {
        this.challenge = challenge;
    };

    /**
     * Get the application key
     *
     * @method getApplicationKey
     * @returns {String}
     */
    ChallengeRequestWSMessage.prototype.getApplicationKey = function () {
        return this.applicationKey;
    };

    /**
     * Set the application key
     *
     * @method setApplicationKey
     * @param {String} applicationKey
     */
    ChallengeRequestWSMessage.prototype.setApplicationKey = function (applicationKey) {
        this.applicationKey = applicationKey;
    };

    /**
     * Get HMAC signature
     *
     * @method getHmacSignature
     * @returns {String}
     */
    ChallengeRequestWSMessage.prototype.getHmacSignature = function () {
        return this.hmac;
    };

    /**
     * Set HMAC signature
     *
     * @method setHmacSignature
     * @param {String} hmac
     */
    ChallengeRequestWSMessage.prototype.setHmacSignature = function (hmac) {
        this.hmac = hmac;
    };

    // Export
    scope.ChallengeRequestWSMessage = ChallengeRequestWSMessage;
})(MyScript);