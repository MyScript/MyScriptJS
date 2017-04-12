/**
 * Parse JSON String to Object
 * @param {Object} req JSON string result to be parsed
 * @return {Object} Parsed response
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
 * @param {Object} obj Query properties
 * @return {String} URI encoded string
 */
export function transformRequest(obj) {
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
 * @param {function} [notify] Notification function
 * @return {Promise}
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
      reject({ msg: `Coud not connect to ${url} connection error`, recoverable: false });
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
 * @param {String} src URL
 * @param {Object} params Query properties
 * @return {Promise}
 */
export function get(src, params) {
  let newSrc = src;
  if (params) {
    newSrc += `?${transformRequest(params)}`;
  }
  return xhr('GET', newSrc, undefined);
}

/**
 * Post request
 * @private
 * @param {String} url URL
 * @param {Object} data Data to be sent
 * @return {Promise}
 */
export function post(url, data) {
  return xhr('POST', url, data);
}
