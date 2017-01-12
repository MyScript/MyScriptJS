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
 * @property {Array<Renderer>} rendererList List of renderer to draw on the inkPaper
 * @property {Array<Recognizer>} recognizerList Recognizers to call with the recognition service
 * @property {function(behaviors: Behaviors, options: Options)} getRecognizerFromOptions Get the recognizer to use regarding the current configuration
 * @property {function(behaviors: Behaviors, options: Options)} getRendererFromOptions Get the renderer to use regarding the current configuration
 * @property {Stroker} stroker Stroker to draw stroke
 * @property {Array} callbacks Functions to handle model changes
 */

/**
 * Default behaviors
 * @type {Behaviors}
 */
export const defaultBehaviors = {
  grabber: Grabber,
  rendererList: [Renderer],
  getRendererFromOptions: (behaviors, options) => {
    let renderer;
    if (options) {
      renderer = behaviors.rendererList.find((item) => {
        const info = item.getInfo();
        return (info.name === options.renderingParams.renderer);
      });
    }
    return renderer;
  },
  recognizerList: [Cdkv3RestTextRecognizer, Cdkv3RestMathRecognizer, Cdkv3RestAnalyzerRecognizer, Cdkv3RestShapeRecognizer, Cdkv3RestMusicRecognizer, Cdkv3WSTextRecognizer, Cdkv3WSMathRecognizer],
  getRecognizerFromOptions: (behaviors, options) => {
    let recognizer;
    if (options) {
      recognizer = behaviors.recognizerList.find((item) => {
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
      rendererList: behaviors.rendererList || defaultBehaviors.rendererList,
      getRendererFromOptions: behaviors.getRendererFromOptions || defaultBehaviors.getRendererFromOptions,
      recognizerList: behaviors.recognizerList || defaultBehaviors.recognizerList,
      getRecognizerFromOptions: behaviors.getRecognizerFromOptions || defaultBehaviors.getRecognizerFromOptions,
      stroker: behaviors.stroker || defaultBehaviors.stroker,
      callbacks: behaviors.callbacks || defaultBehaviors.callbacks
    };
  }
  return defaultBehaviors;
}
