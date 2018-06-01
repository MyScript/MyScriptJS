/* eslint-disable no-unused-expressions */
import * as CryptoHelper from '../CryptoHelper';

/**
 * Parse JSON String to Object
 * @param {Object} req JSON string result to be parsed
 * @return {Object} Parsed response
 */
function parse(req) {
  let result;
  try {
    result = JSON.parse(req.responseText);
  } catch (e) {
    result = req.responseText;
  }
  return result;
}

/**
 * Transform object data request to a list of parameters
 * @param {Object} obj Query properties
 * @return {String} URI encoded string
 */
function transformRequest(obj) {
  const str = [];
  Object.keys(obj).forEach((p) => {
    if ((typeof obj[p] !== 'undefined') &&
        (typeof obj[p] !== 'function')) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  });
  return str.join('&');
}

/**
 * Send request to the network and return a promise
 * @param {String} type Request type (GET/POST)
 * @param {String} url URL
 * @param {Object} data Data to be sent
 * @param {RecognizerContext} [recognizerContext] Recognizer context
 * @param {String} apiVersion api version
 * @param {String} mimeType MimeType to be used
 * @return {Promise}
 */
function xhr(type, url, data, recognizerContext = {}, apiVersion, mimeType) {
  const pptxMimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  const configuration = recognizerContext.editor.configuration;
  const recognizerContextRef = recognizerContext;
  return new Promise((resolve, reject) => {
    // We are writing some browser module here so the no import found should be ignored
    // eslint-disable-next-line no-undef
    const request = new XMLHttpRequest();
    request.open(type, url, true);
    request.withCredentials = true;
    if (apiVersion === 'V3') {
      request.setRequestHeader('Accept', 'application/json');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    } else if (apiVersion === 'V4') {
      switch (configuration.recognitionParams.type) {
        case 'TEXT':
          request.setRequestHeader('Accept', 'application/json,' + mimeType);
          break;
        case 'MATH':
          request.setRequestHeader('Accept', 'application/json,' + mimeType);
          break;
        case 'DIAGRAM':
          request.setRequestHeader('Accept', 'application/json,' + mimeType);
          break;
        case 'Raw Content':
          request.setRequestHeader('Accept', 'application/json,' + mimeType);
          break;
        default:
          break;
      }
      request.setRequestHeader('applicationKey', configuration.recognitionParams.server.applicationKey);
      request.setRequestHeader('hmac', CryptoHelper.computeHmac(JSON.stringify(data), configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey));
      request.setRequestHeader('Content-Type', 'application/json');
    }

    if (mimeType === pptxMimeType) {
      request.responseType = 'blob';
    }

    request.onerror = () => {
      reject({ msg: `Could not connect to ${url} connection error`, recoverable: false });
    };

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        mimeType === pptxMimeType ? resolve(request.response) : resolve(parse(request));
      } else {
        reject(new Error(request.responseText));
      }
    };

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          mimeType === pptxMimeType ? resolve(request.response) : resolve(parse(request));
        }
      }
    };

    if (recognizerContextRef) {
      recognizerContextRef.idle = false;
    }
    if (apiVersion === 'V4') {
      request.send(JSON.stringify(data));
    } else {
      request.send(data ? transformRequest(data) : undefined);
    }
  }).then((res) => {
    if (recognizerContextRef) {
      recognizerContextRef.idle = true;
    }
    return res;
  });
}

/**
 * Get request
 * @param {RecognizerContext} recognizerContext Recognizer context
 * @param {String} url URL
 * @param {Object} params Query properties
 * @return {Promise}
 */
export function get(recognizerContext, url, params) {
  let queryUrl = url;
  if (params) {
    queryUrl += `?${transformRequest(params)}`;
  }
  return xhr('GET', queryUrl, undefined, recognizerContext);
}

/**
 * Post request
 * @param {RecognizerContext} recognizerContext Recognizer context
 * @param {String} url URL
 * @param {Object} data Data to be sent
 * @param {String} apiVersion api version
 * @param {String} mimeType MimeType to be used
 * @return {Promise}
 */
export function post(recognizerContext, url, data, apiVersion, mimeType) {
  return xhr('POST', url, data, recognizerContext, apiVersion, mimeType);
}
