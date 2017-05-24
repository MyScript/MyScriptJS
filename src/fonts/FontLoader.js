import * as WebFontLoader from 'webfontloader';

/**
 * Load math fonts
 * @return {load font promise}
 */

export function load(families) {
  const promise = new Promise((resolve, reject) => {
    const webConfig = {
      custom: { families },
      active() {
        resolve();
      },
      inactive() {
        reject('inactive');
      },
      fontinactive() {
        reject('font inactive');
      }

    };
    WebFontLoader.load(webConfig);
  });

  return promise;
}
