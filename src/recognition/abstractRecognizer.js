(function (scope) {

    /**
     * Abstract recognizer interface
     *
     * @class AbstractRecognizer
     * @param {String} url
     * @constructor
     */
    function AbstractRecognizer (url) {
        this.url = url;
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
    AbstractRecognizer.prototype.getAvailableLanguageList = function (applicationKey, hmacKey, inputMode) {
        var data = new scope.RecognitionLanguagesData();
        data.setApplicationKey(applicationKey);
        data.setInputMode(inputMode);
        data.setHmac(this.computeHmac(applicationKey, '', hmacKey));

        return this.http.get(this.url + '/text/languages.json', data).then(
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
        var jsonInput = (typeof data == 'object') ? JSON.stringify(data) : data;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    };

    /**
     * Authenticate the websocket client end with a handshake of HMAC signature
     *
     * @method takeUpHmacChallenge
     * @param {String} applicationKey
     * @param {String} hmac
     * @param {String} challenge
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