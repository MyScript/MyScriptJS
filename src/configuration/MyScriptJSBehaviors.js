import * as Grabber from '../grabber/PointerEventGrabber';
import * as Renderer from '../renderer/canvas/CanvasRenderer';
import * as Stroker from '../renderer/canvas/stroker/QuadraticCanvasStroker';
import * as Cdkv3RestTextRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestTextRecognizer';
import * as Cdkv3RestMathRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestMathRecognizer';
import * as Cdkv3RestAnalyzerRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestAnalyzerRecognizer';
import * as Cdkv3RestShapeRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestShapeRecognizer';
import * as Cdkv3RestMusicRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestMusicRecognizer';
import * as Cdkv3WSMathRecognizer from '../recognizer/cdkv3/websocket/Cdkv3WSMathRecognizer';
import * as Cdkv3WSTextRecognizer from '../recognizer/cdkv3/websocket/Cdkv3WSTextRecognizer';
import eventCallback from '../callback/EventCallback';

/**
 * Set of behaviors to be used by the {@link InkPaper}
 * @typedef {Object} Behaviors
 * @property {Grabber} grabber Grabber to capture strokes
 * @property {Renderer} renderer Renderer to draw on the inkPaper
 * @property {Array<Recognizer>} recognizers Recognizers to call with the recognition service
 * @property {function(behaviors: Behaviors, options: Options)} getRecognizerFromOptions Get the recognizer to use regarding the current configuration
 * @property {Stroker} stroker Stroker to draw stroke
 * @property {Array} callbacks Functions to handle model changes
 */

/**
 * Default behaviors
 * @type {Behaviors}
 */
export const defaultBehaviors = {
  grabber: Grabber,
  renderer: Renderer,
  recognizers: [Cdkv3RestTextRecognizer, Cdkv3RestMathRecognizer, Cdkv3RestAnalyzerRecognizer, Cdkv3RestShapeRecognizer, Cdkv3RestMusicRecognizer, Cdkv3WSTextRecognizer, Cdkv3WSMathRecognizer],
  getRecognizerFromOptions: (behaviors, options) => {
    let recognizer;
    if (options) {
      recognizer = behaviors.recognizers.find((item) => {
        const supportedConfiguration = item.getSupportedConfiguration();
        return (supportedConfiguration.type === options.recognitionParams.type) &&
            (supportedConfiguration.protocol === options.recognitionParams.protocol) &&
            (supportedConfiguration.apiVersion === options.recognitionParams.apiVersion);
      });
    }
    return recognizer;
  },
  stroker: Stroker,
  callbacks: [eventCallback]
};

/**
 * Generate behaviors
 * @param {Behaviors} behaviors Behaviors to be used
 * @return {Behaviors} Overridden behaviors
 */
export function overrideDefaultBehaviors(behaviors) {
  if (behaviors) {
    return {
      grabber: behaviors.grabber || defaultBehaviors.grabber,
      renderer: behaviors.renderer || defaultBehaviors.renderer,
      recognizers: behaviors.recognizers || defaultBehaviors.recognizers,
      getRecognizerFromOptions: behaviors.getRecognizerFromOptions || defaultBehaviors.getRecognizerFromOptions,
      stroker: behaviors.stroker || defaultBehaviors.stroker,
      callbacks: behaviors.callbacks || defaultBehaviors.callbacks
    };
  }
  return defaultBehaviors;
}
