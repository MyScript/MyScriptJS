/**
 * @typedef {Object} DestructuredPromise
 * @property {Promise} promise
 * @property {function(value: Object)} resolve
 * @property {function(reason: Object)} reject
 */

/**
 * @return {DestructuredPromise}
 */
export function destructurePromise() {
  let resolve;
  let reject;
  const initPromise = new Promise(
      (resolveParam, rejectParam) => {
        resolve = resolveParam;
        reject = rejectParam;
      });
  return { promise: initPromise, resolve, reject };
}
