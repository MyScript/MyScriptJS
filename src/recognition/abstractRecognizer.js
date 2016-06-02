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
        this.setUrl(this.getProtocol() + 'cloud.myscript.com');
        if (host) {
            this.setUrl(this.getProtocol() + host);
        }
        this.setSSL(true);
    }

    AbstractRecognizer.prototype.getProtocol = function() {
        return this._ssl? 'https://': 'http://';
    };

    AbstractRecognizer.prototype.getSSL = function() {
        return this._ssl;
    };

    AbstractRecognizer.prototype.setSSL = function (ssl) {
        if (ssl !== undefined) {
            this._ssl = ssl;
            this.setUrl(this.getProtocol() + this.getHost());
        }
    };

    /**
     * Get the recognition service host
     *
     * @method getHost
     * @returns {string|String|*}
     */
    AbstractRecognizer.prototype.getHost = function() {
        return scope.NetworkInterface.parseURL(this.getUrl()).host;
    };

    /**
     * Set the recognition service host
     *
     * @method setHost
     * @param {String}
     */
    AbstractRecognizer.prototype.setHost = function (host) {
        if (host !== undefined) {
            this.setUrl(this.getProtocol() + host);
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
     * Get precision
     *
     * @method getPrecision
     * @returns {Number}
     */
    AbstractRecognizer.prototype.getPrecision = function () {
        return this.precision;
    };

    /**
     * Set precision
     *
     * @method setPrecision
     * @param {Number} precision
     */
    AbstractRecognizer.prototype.setPrecision = function (precision) {
        this.precision = precision;
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
        if (input.getComponents) {
            _filterStrokes(input.getComponents(), this.getPrecision());
        } else if (input.getInputUnits) {
            for (var i in input.getInputUnits()) {
                _filterStrokes(input.getInputUnits()[i].getComponents(), this.getPrecision());
            }
        }

        if (input instanceof scope.TextRecognitionInput) {
            return _doTextRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
        } else if (input instanceof scope.ShapeRecognitionInput) {
            return _doShapeRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
        } else if (input instanceof scope.MathRecognitionInput) {
            return _doMathRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
        } else if (input instanceof scope.MusicRecognitionInput) {
            return _doMusicRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
        } else if (input instanceof scope.AnalyzerRecognitionInput) {
            return _doAnalyzerRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
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
     * @param {TextRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _doTextRecognition = function (url, input, applicationKey, hmacKey, instanceId) {
        var data = new scope.TextRecognitionData();
        _fillData(data, input, instanceId, applicationKey, hmacKey);

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.TextResult(response);
            }
        );
    };

    /**
     * Do shape recognition
     *
     * @private
     * @method _doShapeRecognition
     * @param {String} url
     * @param {ShapeRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _doShapeRecognition = function (url, input, applicationKey, hmacKey, instanceId) {
        var data = new scope.ShapeRecognitionData();
        _fillData(data, input, instanceId, applicationKey, hmacKey);

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.ShapeResult(response);
            }
        );
    };

    /**
     * Clear shape recognition
     *
     * @private
     * @method _clearShapeRecognition
     * @param {String} url
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _clearShapeRecognition = function (url, instanceId) {
        var data = {
            instanceSessionId: instanceId
        };

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/shape/clearSessionId.json', data).then(
            function success(response) {
                return new scope.ShapeResult(response);
            }
        );
    };

    /**
     * Do shape recognition
     *
     * @private
     * @method _doMathRecognition
     * @param {String} url
     * @param {MathRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _doMathRecognition = function (url, input, applicationKey, hmacKey, instanceId) {
        var data = new scope.MathRecognitionData();
        _fillData(data, input, instanceId, applicationKey, hmacKey);

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.MathResult(response);
            }
        );
    };

    /**
     * Do music recognition
     *
     * @private
     * @method _doMusicRecognition
     * @param {String} url
     * @param {MusicRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _doMusicRecognition = function (url, input, applicationKey, hmacKey, instanceId) {
        var data = new scope.MusicRecognitionData();
        _fillData(data, input, instanceId, applicationKey, hmacKey);

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/music/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.MusicResult(response);
            }
        );
    };

    /**
     * Do analyzer recognition
     *
     * @method _doAnalyzerRecognition
     * @param {String} url
     * @param {AnalyzerRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _doAnalyzerRecognition = function (url, input, applicationKey, hmacKey, instanceId) {
        var data = new scope.AnalyzerRecognitionData();
        _fillData(data, input, instanceId, applicationKey, hmacKey);

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.AnalyzerResult(response);
            }
        );
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

    var _filterStrokes = function (components, precision) {
        components.forEach(function (currentValue) {
            if (currentValue instanceof scope.StrokeComponent) {
                currentValue.toFixed(precision);
            }
        });
    };

    var _fillData = function (data, input, instanceId, applicationKey, hmacKey) {
        data.setRecognitionInput(input);
        data.setApplicationKey(applicationKey);
        data.setInstanceId(instanceId);
        if (hmacKey) {
            data.setHmac(_computeHmac(data.getRecognitionInput(), applicationKey, hmacKey));
        }
    };

    // Export
    scope.AbstractRecognizer = AbstractRecognizer;
})(MyScript, CryptoJS);
