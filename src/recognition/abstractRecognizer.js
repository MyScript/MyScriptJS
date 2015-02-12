(function (scope) {
    'use strict';
    /**
     * Abstract recognizer interface
     *
     * @class AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function AbstractRecognizer (host) {
        this.host = 'cloud.myscript.com';
        if (host) {
            this.host = host;
        }
        this.http = new scope.NetworkInterface();
    }

    /**
     * Get the recognition languages available for an application and a specific inputMode
     *
     * @method getAvailableLanguageList
     * @param {String} applicationKey
     * @param {String} inputMode
     * @returns {QReturnValue}
     */
    AbstractRecognizer.prototype.getAvailableLanguageList = function (applicationKey, inputMode) {
        var data = new scope.RecognitionLanguagesData();
        data.setApplicationKey(applicationKey);
        data.setInputMode(inputMode);

        return this.http.get('http://' + this.host + '/api/v3.0/recognition/rest/text/languages.json', data).then(
            function success (response) {
                return response.result;
            },
            function error (response) {
                return response;
            }
        );
    };

    /**
     * Compute HMAC signature for server authentication
     *
     * @method computeHmac
     * @param {String} applicationKey
     * @param {String} data
     * @param {String} hmacKey
     */

    AbstractRecognizer.prototype.computeHmac = function (applicationKey, data, hmacKey) {
        var jsonInput = (typeof data === 'object') ? JSON.stringify(data) : data;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    };

    /**
     * Authenticate the websocket client end with a handshake of HMAC signature
     *
     * @method takeUpHmacChallenge
     * @param {String} applicationKey
     * @param {String} challenge
     * @param {String} hmacKey
     */
    AbstractRecognizer.prototype.takeUpHmacChallenge = function (applicationKey, challenge, hmacKey) {
        if (!this.socket) {
            return;
        }

        var hmacMessage = {
            type: 'hmac',
            applicationKey: applicationKey,
            hmac: this.computeHmac(applicationKey, challenge, hmacKey),
            challenge: challenge
        };
        this.socket.send(JSON.stringify(hmacMessage));
    };
    // Export
    scope.AbstractRecognizer = AbstractRecognizer;
})(MyScript);