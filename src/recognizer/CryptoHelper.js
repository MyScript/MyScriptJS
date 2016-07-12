'use strict';

(function (scope) {
/**
 * Compute HMAC signature for server authentication
 *
 * @private
 * @method _computeHmac
 * @param {AbstractRecognitionInput} input
 * @param {String} applicationKey
 * @param {String} hmacKey
 */
var computeHmac = function (input, applicationKey, hmacKey) {
  var jsonInput = (typeof input === 'object') ? JSON.stringify(input) : input;
  return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
};

  MyScript.CryptoHelper = {
    computeHmac : computeHmac
  }
})(MyScript);