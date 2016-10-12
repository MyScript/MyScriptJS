export function parseURL(document, url) {
  const parser = document.createElement('a');
  const searchObject = {};
  let split;
  let i;
  // Let the browser do the work
  parser.href = url;
  // Convert query string to object
  const queries = parser.search.replace(/^\?/, '').split('&');
  for (i = 0; i < queries.length; i++) {
    split = queries[i].split('=');
    searchObject[split[0]] = split[1];
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject,
    hash: parser.hash
  };
}

/**
 * Parse JSON String to Object
 *
 * @method parse
 * @param {Object} req
 * @returns {Object}
 */
export function parse(req) {
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
 *
 * @method transformRequest
 * @param {Object} [obj]
 * @returns {String}
 */
export function transformRequest(obj) {
  const str = [];
  Object.keys(obj).forEach((p) => {
    if ((typeof obj[p] !== 'undefined') &&
        (typeof obj[p] !== 'function')) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  });
  return str.join('&');
}

/**
 * Send request to the network and return a promise
 *
 * @method xhr
 * @param {String} type
 * @param {String} url
 * @param {Object} data
 * @returns {Promise}
 */
export function xhr(type, url, data) {
  return new Promise((resolve, reject, notify) => {
    // We are writing some browser module here so the no import found should be ignored
    // eslint-disable-next-line no-undef
    const request = new XMLHttpRequest();

    function onStateChange() {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          resolve(parse(request));
        }
      }
    }

    function onLoad() {
      if (request.status >= 200 && request.status < 300) {
        resolve(parse(request));
      } else {
        reject(new Error(request.responseText));
      }
    }

    function onError() {
      reject(new Error('Can\'t XHR ' + url));
    }

    function onProgress(e) {

      // FIXME No progress tracking currently
      // notify(e.loaded / e.total);
    }
    request.open(type, url, true);
    request.withCredentials = true;
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    request.onerror = onError;
    request.onprogress = onProgress;
    request.onload = onLoad;
    request.onreadystatechange = onStateChange;
    request.send(transformRequest(data));
  });
}

/**
 * Get request
 *
 * @method get
 * @param {String} src
 * @param {Object} params
 * @returns {Promise}
 */
export function get(src, params) {
  let newSrc = src;
  if (params) {
    newSrc += '?' + transformRequest(params);
  }
  return xhr('GET', newSrc, undefined);
}

/**
 * Put request
 *
 * @method put
 * @param {String} url
 * @param {Object} data
 * @returns {Promise}
 */
export function put(url, data) {
  return xhr('PUT', url, data);
}

/**
 * Post request
 *
 * @method post
 * @param {String} url
 * @param {Object} data
 * @returns {Promise}
 */
export function post(url, data) {
  return xhr('POST', url, data);
}
