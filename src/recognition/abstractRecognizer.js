'use strict';

(function (scope, CryptoJS) {
    /**
     * Abstract recognizer interface
     *
     * @class AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function AbstractRecognizer(host) {
        this.host = 'cloud.myscript.com';
        if (host) {
            this.setHost(host);
        }
    }

    /**
     * Get the recognition service host
     *
     * @method getHost
     * @returns {string|String|*}
     */
    AbstractRecognizer.prototype.getHost = function() {
        return this.host;
    };

    /**
     * Set the recognition service host
     *
     * @method setHost
     * @param {String}
     */
    AbstractRecognizer.prototype.setHost = function (host) {
        if (host !== undefined) {
            this.host = host;
        }
    };

    /**
     * Get the recognition languages available for an application and a specific inputMode
     *
     * @method getAvailableLanguageList
     * @param {String} applicationKey
     * @param {String} inputMode
     * @returns {Promise}
     */
    AbstractRecognizer.prototype.getAvailableLanguageList = function (applicationKey, inputMode) {
        var data = new scope.RecognitionLanguagesData();
        data.setApplicationKey(applicationKey);
        data.setInputMode(inputMode);

        return scope.NetworkInterface.get('https://' + this.getHost() + '/api/v3.0/recognition/rest/text/languages.json', data).then(
            function success(response) {
                return response.result;
            },
            function error(response) {
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
    // Export
    scope.AbstractRecognizer = AbstractRecognizer;
})(MyScript, CryptoJS);
