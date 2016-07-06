'use strict';

(function (scope, CryptoJS) {

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
    AbstractRecognizer.prototype.doRestRecognition = function (url, applicationKey, hmacKey, instanceId, strokesToRecognize, callback) {
        if (input.getComponents) {
            _filterStrokes(input.getComponents(), this.getPrecision());
        } else if (input.getInputUnits) {
            for (var i in input.getInputUnits()) {
                _filterStrokes(input.getInputUnits()[i].getComponents(), this.getPrecision());
            }
        }

        return scope.NetworkInterface.post(url, data).then(
            function success(response) {
                return new scope.TextResult(response);
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
