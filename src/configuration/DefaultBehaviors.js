import { editorLogger as logger } from './LoggerConfig';
import * as PointerEventGrabber from '../grabber/PointerEventGrabber';
import * as CanvasRenderer from '../renderer/canvas/CanvasRenderer';
import * as QuadraticCanvasStroker from '../renderer/canvas/stroker/QuadraticCanvasStroker';
import * as SVGRenderer from '../renderer/svg/SVGRenderer';
import * as QuadraticSVGStroker from '../renderer/svg/stroker/QuadraticSVGStroker';
import * as Cdkv3RestTextRecognizer from '../recognizer/rest/v3/Cdkv3RestTextRecognizer';
import * as Cdkv3RestMathRecognizer from '../recognizer/rest/v3/Cdkv3RestMathRecognizer';
import * as Cdkv3RestAnalyzerRecognizer from '../recognizer/rest/v3/Cdkv3RestAnalyzerRecognizer';
import * as Cdkv3RestShapeRecognizer from '../recognizer/rest/v3/Cdkv3RestShapeRecognizer';
import * as Cdkv3RestMusicRecognizer from '../recognizer/rest/v3/Cdkv3RestMusicRecognizer';
import * as Cdkv3WSMathRecognizer from '../recognizer/websocket/v3/Cdkv3WSMathRecognizer';
import * as Cdkv3WSTextRecognizer from '../recognizer/websocket/v3/Cdkv3WSTextRecognizer';
import * as Cdkv4WSInteractiveRecognizer from '../recognizer/websocket/v4/Cdkv4WSIInkRecognizer';
import eventCallback from '../callback/EventCallback';

/**
 * Current behavior
 * @typedef {Object} Behavior
 * @property {Grabber} grabber Grabber to capture strokes
 * @property {Stroker} stroker Stroker to draw stroke
 * @property {Renderer} renderer Renderer to draw on the editor
 * @property {Recognizer} recognizer Recognizer to call the recognition service
 * @property {Array} callbacks Functions to handle model changes
 */

/**
 * Set of behaviors to be used by the {@link Editor}
 * @typedef {Object} Behaviors
 * @property {Grabber} grabber Grabber to capture strokes
 * @property {Array<Stroker>} strokerList List of stroker to draw stroke
 * @property {Array<Renderer>} rendererList List of renderer to draw on the editor
 * @property {Array<Recognizer>} recognizerList Recognizers to call the recognition service
 * @property {function(behaviors: Behaviors, configuration: Configuration): Behavior} getBehaviorFromConfiguration Get the current behavior to use regarding the current configuration
 * @property {Array} callbacks Functions to handle model changes
 */

/**
 * Default behaviors
 * @type {Behaviors}
 */
export const defaultBehaviors = {
  grabber: PointerEventGrabber,
  strokerList: [QuadraticCanvasStroker, QuadraticSVGStroker],
  rendererList: [CanvasRenderer, SVGRenderer],
  recognizerList: [Cdkv3RestTextRecognizer, Cdkv3RestMathRecognizer, Cdkv3RestAnalyzerRecognizer, Cdkv3RestShapeRecognizer, Cdkv3RestMusicRecognizer, Cdkv3WSTextRecognizer, Cdkv3WSMathRecognizer, Cdkv4WSInteractiveRecognizer],
  callbacks: [eventCallback],
  getBehaviorFromConfiguration: (behaviors, configuration) => {
    const behavior = {};
    behavior.grabber = behaviors.grabber;
    if (configuration) {
      behavior.stroker = behaviors.strokerList.find(item =>
                                                    (item.getInfo().apiVersion === configuration.recognitionParams.apiVersion) &&
                                                    (item.getInfo().name === configuration.renderingParams.stroker));
      behavior.renderer = behaviors.rendererList.find(item => item.getInfo().apiVersion === configuration.recognitionParams.apiVersion);
      behavior.recognizer = behaviors.recognizerList.find(item =>
                                                          (item.getInfo().types.includes(configuration.recognitionParams.type)) &&
                                                          (item.getInfo().protocol === configuration.recognitionParams.protocol) &&
                                                          (item.getInfo().apiVersion === configuration.recognitionParams.apiVersion));
    }
    behavior.callbacks = behaviors.callbacks;
    return behavior;
  }
};

/**
 * Generate behaviors
 * @param {Behaviors} behaviors Behaviors to be used
 * @return {Behaviors} Overridden behaviors
 */
export function overrideDefaultBehaviors(behaviors) {
  if (behaviors) {
    const currentBehaviors = {
      grabber: behaviors.grabber || defaultBehaviors.grabber,
      rendererList: behaviors.rendererList || defaultBehaviors.rendererList,
      strokerList: behaviors.strokerList || defaultBehaviors.strokerList,
      recognizerList: behaviors.recognizerList || defaultBehaviors.recognizerList,
      callbacks: behaviors.callbacks || defaultBehaviors.callbacks,
      getBehaviorFromConfiguration: behaviors.getBehaviorFromConfiguration || defaultBehaviors.getBehaviorFromConfiguration
    };
    logger.debug('Override default behaviors', currentBehaviors);
    return currentBehaviors;
  }
  return defaultBehaviors;
}
