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
        this.setUrl('https://cloud.myscript.com');
        if (host) {
            this.setUrl('https://' + host);
        }
    }

    /**
     * Get the recognition service host
     *
     * @deprecated use getUrl instead
     * @method getHost
     * @returns {string|String|*}
     */
    AbstractRecognizer.prototype.getHost = function() {
        return scope.NetworkInterface.parseURL(this.getUrl()).host;
    };

    /**
     * Set the recognition service host
     *
     * @deprecated use setUrl instead
     * @method setHost
     * @param {String}
     */
    AbstractRecognizer.prototype.setHost = function (host) {
        if (host !== undefined) {
            this.setUrl('https://' + host);
        }
    };

    /**
     * Get the recognition service host
     *
     * @method getUrl
     * @returns {String}
     */
    AbstractRecognizer.prototype.getUrl = function() {
        return this.url;
    };

    /**
     * Set the recognition service url
     *
     * @method setUrl
     * @param {String}
     */
    AbstractRecognizer.prototype.setUrl = function (url) {
        if (url !== undefined) {
            this.url = url;
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

        return scope.NetworkInterface.get(this.getUrl() + '/api/v3.0/recognition/rest/text/languages.json', data).then(
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
     * @private
     * @method doRestRecognition
     * @param {AbstractRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    AbstractRecognizer.prototype.doRestRecognition = function (input, applicationKey, hmacKey, instanceId) {

        function _fillData(data, input, instanceId, applicationKey, hmacKey) {
            data.setRecognitionInput(input);
            data.setApplicationKey(applicationKey);
            data.setInstanceId(instanceId);
            if (hmacKey) {
                data.setHmac(_computeHmac(data.getRecognitionInput(), applicationKey, hmacKey));
            }
        }

        if (input instanceof scope.TextRecognitionInput) {
            var textData = new scope.TextRecognitionData();
            _fillData(textData, input, instanceId, applicationKey, hmacKey);
            return _doTextRecognition(this.getUrl(), textData);

        } else if (input instanceof scope.ShapeRecognitionInput) {
            var shapeData = new scope.ShapeRecognitionData();
            _fillData(shapeData, input, instanceId, applicationKey, hmacKey);
            return _doShapeRecognition(this.getUrl(), shapeData);

        } else if (input instanceof scope.MathRecognitionInput) {
            var mathData = new scope.MathRecognitionData();
            _fillData(mathData, input, instanceId, applicationKey, hmacKey);
            return _doMathRecognition(this.getUrl(), mathData);

        } else if (input instanceof scope.MusicRecognitionInput) {
            var musicData = new scope.MusicRecognitionData();
            _fillData(musicData, input, instanceId, applicationKey, hmacKey);
            return _doMusicRecognition(this.getUrl(), musicData);

        } else if (input instanceof scope.AnalyzerRecognitionInput) {
            var analyzerData = new scope.AnalyzerRecognitionData();
            _fillData(analyzerData, input, instanceId, applicationKey, hmacKey);
            return _doAnalyzerRecognition(this.getUrl(), analyzerData);

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
        return _clearShapeRecognition(this.getUrl(), data);
    };

    /**
     * Do text recognition
     *
     * @private
     * @method _doTextRecognition
     * @param {String} url
     * @param {TextRecognitionData} data
     * @returns {Promise}
     */
    var _doTextRecognition = function (url, data) {
        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data).then(
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
     * @param {String} url
     * @param {ShapeRecognitionData} data
     * @returns {Promise}
     */
    var _doShapeRecognition = function (url, data) {
        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', data).then(
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
     * @param {String} url
     * @param {Object} data
     * @returns {Promise}
     */
    var _clearShapeRecognition = function (url, data) {
        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/shape/clearSessionId.json', data).then(
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
     * @param {String} url
     * @param {MathRecognitionData} data
     * @returns {Promise}
     */
    var _doMathRecognition = function (url, data) {
        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data).then(
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
     * @param {String} url
     * @param {MusicRecognitionData} data
     * @returns {Promise}
     */
    var _doMusicRecognition = function (url, data) {
        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/music/doSimpleRecognition.json', data).then(
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
     * @param {String} url
     * @param {AnalyzerRecognitionData} data
     * @returns {Promise}
     */
    var _doAnalyzerRecognition = function (url, data) {
        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data).then(
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
