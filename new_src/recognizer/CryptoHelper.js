'use strict';
import * as CryptoJS  from '../../bower_components/crypto-js/crypto-js';
import HmacSHA512 from '../../bower_components/crypto-js/hmac-sha512';
import {recognizerLogger as logger} from '../../target/configuration/LoggerConfig';


/**
 * Compute HMAC signature for server authentication
 *
 * @private
 * @method _computeHmac
 * @param {AbstractRecognitionInput} input
 * @param {String} applicationKey
 * @param {String} hmacKey
 */
export function computeHmac(input, applicationKey, hmacKey) {
  var jsonInput = (typeof input === 'object') ? JSON.stringify(input) : input;
  logger.debug('The HmacSHA512 function is loaded',HmacSHA512);
  return HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
};