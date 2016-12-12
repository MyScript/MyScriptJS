import { enc } from 'crypto-js';
import HmacSHA512 from 'crypto-js/hmac-sha512';
import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * Compute HMAC signature for server authentication
 *
 * @param {Object} input Input data to compute HMAC
 * @param {String} applicationKey Current applicationKey
 * @param {String} hmacKey Current hmacKey
 * @return {String} Signature
 */
export function computeHmac(input, applicationKey, hmacKey) {
  const jsonInput = (typeof input === 'object') ? JSON.stringify(input) : input;
  logger.debug('The HmacSHA512 function is loaded', HmacSHA512);
  return new HmacSHA512(jsonInput, applicationKey + hmacKey).toString(enc.Hex);
}
