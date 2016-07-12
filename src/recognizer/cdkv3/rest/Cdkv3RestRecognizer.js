'use strict';

(function (scope, CryptoJS) {

    function cdkv3RestRecognizer(){
        this.type = 'cdkv3RestRecognizer'
    }

    /**
     * Get the recognition languages available for an application and a specific inputMode
     *
     * @method getAvailableLanguageList
     * @param {String} applicationKey
     * @param {String} inputMode
     * @returns {Promise}
     */
    cdkv3RestRecognizer.prototype.getAvailableLanguageList = function (applicationKey, inputMode) {
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
    cdkv3RestRecognizer.prototype.doRestRecognition = function (input, applicationKey, hmacKey, instanceId) {
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
    cdkv3RestRecognizer.prototype.clearRestRecognition = function (instanceId) {
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


    var _fillData = function (data, input, instanceId, applicationKey, hmacKey) {
        data.setRecognitionInput(input);
        data.setApplicationKey(applicationKey);
        data.setInstanceId(instanceId);
        if (hmacKey) {
            data.setHmac(_computeHmac(data.getRecognitionInput(), applicationKey, hmacKey));
        }
    };

    // Export
    scope.cdkv3RestRecognizer = cdkv3RestRecognizer;
})(MyScript, CryptoJS);
