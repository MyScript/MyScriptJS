/**
 * Create a promise and destructure it to have a direct access to resolve and reject.
 * @returns {{promise: Promise, resolve: *, reject: *}}
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
