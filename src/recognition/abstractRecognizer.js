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
     * Get parameters
     *
     * @method getParameters
     * @returns {AbstractParameter}
     */
    AbstractRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {AbstractParameter} parameters
     */
    AbstractRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
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
     * Do REST recognition
     *
     * @method doRestRecognition
     * @param {AbstractRecognitionData} data
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    AbstractRecognizer.prototype.doRestRecognition = function (data, applicationKey, hmacKey, instanceId) {
        data.setApplicationKey(applicationKey);
        data.setInstanceId(instanceId);
        if (hmacKey) {
            data.setHmac(_computeHmac(data.getRecognitionInput(), applicationKey, hmacKey));
        }

        if (data instanceof scope.TextRecognitionData) {
            return _doTextRecognition(this.getHost(), data);
        } else if (data instanceof scope.ShapeRecognitionData) {
            return _doShapeRecognition(this.getHost(), data);
        } else if (data instanceof scope.MathRecognitionData) {
            return _doMathRecognition(this.getHost(), data);
        } else if (data instanceof scope.MusicRecognitionData) {
            return _doMusicRecognition(this.getHost(), data);
        } else if (data instanceof scope.AnalyzerRecognitionData) {
            return _doAnalyzerRecognition(this.getHost(), data);
        } else {
            throw new Error('not implemented');
        }
    };

    /**
     * Clear REST recognition
     *
     * @method clearRestRecognition
     * @param {String} instanceId
     * @returns {Promise}
     */
    AbstractRecognizer.prototype.clearRestRecognition = function (instanceId) {
        var data = {
            instanceSessionId: instanceId
        };
        return _clearShapeRecognition(this.getHost(), data);
    };

    /**
     * Do text recognition
     *
     * @private
     * @method _doTextRecognition
     * @param {String} host
     * @param {TextRecognitionData} data
     * @returns {Promise}
     */
    var _doTextRecognition = function (host, data) {
        return scope.NetworkInterface.post('https://' + host + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.TextResult(response);
            },
            function error(response) {
                return response;
            }
        );
    };

    /**
     * Do shape recognition
     *
     * @private
     * @method _doShapeRecognition
     * @param {String} host
     * @param {ShapeRecognitionData} data
     * @returns {Promise}
     */
    var _doShapeRecognition = function (host, data) {
        return scope.NetworkInterface.post('https://' + host + '/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.ShapeResult(response);
            },
            function error(response) {
                return response;
            }
        );
    };

    /**
     * Clear shape recognition
     *
     * @private
     * @method _clearShapeRecognition
     * @param {String} host
     * @param {Object} data
     * @returns {Promise}
     */
    var _clearShapeRecognition = function (host, data) {
        return scope.NetworkInterface.post('https://' + host + '/api/v3.0/recognition/rest/shape/clearSessionId.json', data).then(
            function success(response) {
                return new scope.ShapeResult(response);
            },
            function error(response) {
                return response;
            }
        );
    };

    /**
     * Do shape recognition
     *
     * @private
     * @method _doMathRecognition
     * @param {String} host
     * @param {MathRecognitionData} data
     * @returns {Promise}
     */
    var _doMathRecognition = function (host, data) {
        return scope.NetworkInterface.post('https://' + host + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.MathResult(response);
            },
            function error(response) {
                return response;
            }
        );
    };

    /**
     * Do music recognition
     *
     * @private
     * @method _doMusicRecognition
     * @param {String} host
     * @param {MusicRecognitionData} data
     * @returns {Promise}
     */
    var _doMusicRecognition = function (host, data) {
        return scope.NetworkInterface.post('https://' + host + '/api/v3.0/recognition/rest/music/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.MusicResult(response);
            },
            function error(response) {
                return response;
            }
        );
    };

    /**
     * Do analyzer recognition
     *
     * @method _doAnalyzerRecognition
     * @param {String} host
     * @param {AnalyzerRecognitionData} data
     * @returns {Promise}
     */
    var _doAnalyzerRecognition = function (host, data) {
        return scope.NetworkInterface.post('https://' + host + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.AnalyzerResult(response);
            },
            function error(response) {
                return response;
            }
        );
    };

    /**
     * Compute HMAC signature for server authentication
     *
     * @deprecated
     * @method computeHmac
     * @param {String} applicationKey
     * @param {String} data
     * @param {String} hmacKey
     */
    AbstractRecognizer.prototype.computeHmac = function (applicationKey, data, hmacKey) {
        return _computeHmac(data, applicationKey, hmacKey);
    };

    /**
     * Compute HMAC signature for server authentication
     *
     * @private
     * @method _computeHmac
     * @param {AbstractRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     */
    var _computeHmac = function (input, applicationKey, hmacKey) {
        var jsonInput = (typeof input === 'object') ? JSON.stringify(input) : input;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    };

    // Export
    scope.AbstractRecognizer = AbstractRecognizer;
})(MyScript, CryptoJS);
