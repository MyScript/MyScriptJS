import * as WebFontLoader from 'webfontloader';

/**
 * Load fonts
 * @return {Promise}
 */
function load(families) {
  return new Promise((resolve, reject) => {
    WebFontLoader.load(
      {
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
      });
  });
}

export function loadFromConfiguration(configuration) {
  if (configuration.recognitionParams.apiVersion === 'V4') {
    if (configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].fonts &&
      configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].fonts.length > 0) {
      return load(configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].fonts);
    }
  }
  return Promise.resolve();
}
