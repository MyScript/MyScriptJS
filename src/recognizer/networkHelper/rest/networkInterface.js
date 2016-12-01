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
 * @param notify
 * @returns {Promise}
 */
export function xhr(type, url, data, notify) {
  return new Promise((resolve, reject) => {
    // We are writing some browser module here so the no import found should be ignored
    // eslint-disable-next-line no-undef
    const request = new XMLHttpRequest();
    request.open(type, url, true);
    request.withCredentials = true;
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

    request.onerror = () => {
      reject(new Error('Can\'t XHR ' + url));
    };

    request.onprogress = (e) => {
      if (notify) {
        notify(e.loaded / e.total);
      }
    };

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(parse(request));
      } else {
        reject(new Error(request.responseText));
      }
    };

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          resolve(parse(request));
        }
      }
    };

    request.send(data ? transformRequest(data) : undefined);
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
