/**
 * @return {{promise: Promise, resolve: *, reject: *}}
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
