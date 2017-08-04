import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkWSInterface from '../networkWSInterface';
import * as CdkCommonUtil from '../../common/CdkCommonUtil';
import * as Cdkv3CommonTextRecognizer from '../../common/v3/Cdkv3CommonTextRecognizer';
import * as Cdkv3CommonMathRecognizer from '../../common/v3/Cdkv3CommonMathRecognizer';
import * as RecognizerContext from '../../../model/RecognizerContext';
import * as InkModel from '../../../model/InkModel';
import Constants from '../../../configuration/Constants';

/**
 * A CDK v3 websocket dialog have this sequence :
 * ---------- Client ------------------------------------- Server ----------------------------------
 * init (send the applicationKey) ================>
 *                                       <=========== hmacChallenge
 * answerToHmacChallenge (send the hmac) =========>
 *                                       <=========== init
 * start (send the parameters and first strokes ) ===============>
 *                                       <=========== recognition with instance id
 * continue (send the other strokes ) ============>
 *                                       <=========== recognition
 */

function manageResult(recognizerContext, recognitionContext, message) {
  const modelReference = recognitionContext.model;
  if (message.data.instanceId) {
    if (recognizerContext.instanceId && recognizerContext.instanceId !== message.data.instanceId) {
      logger.debug(`Instance id switch from ${recognizerContext.instanceId} to ${message.data.instanceId} this is suspicious`);
    }
    const recognizerContextReference = recognizerContext;
    recognizerContextReference.instanceId = message.data.instanceId;
    logger.debug('Memorizing instance id', message.data.instanceId);

    modelReference.rawResults.exports = message.data;
    switch (message.data.type) {
      case 'textResult':
        modelReference.exports = Cdkv3CommonTextRecognizer.extractExports(recognitionContext.model);
        break;
      case 'mathResult':
        modelReference.recognizedSymbols = Cdkv3CommonMathRecognizer.extractRecognizedSymbols(recognitionContext.model);
        modelReference.exports = CdkCommonUtil.extractExports(recognitionContext.model);
        break;
      default:
        modelReference.exports = CdkCommonUtil.extractExports(recognitionContext.model);
        break;
    }
  }
  recognitionContext.callback(undefined, InkModel.updateModelReceivedPosition(recognitionContext.model), Constants.EventType.EXPORTED);
}

/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param {DestructuredPromise} destructuredPromise
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {InitializationContext} initContext Initialization structure
 * @return {function} Callback to handle WebSocket results
 */
export function buildWebSocketCallback(destructuredPromise, recognizerContext, model, initContext) {
  return (message) => {
    const recognizerContextRef = recognizerContext;
    // Handle websocket messages
    logger.trace(`${message.type} websocket callback`, message);
    const recognitionContext = recognizerContext.recognitionContexts[recognizerContext.recognitionContexts.length - 1];
    logger.debug('Current recognition context', recognitionContext);

    switch (message.type) {
      case 'open' :
        NetworkWSInterface.send(recognizerContext, initContext.buildInitMessage(recognizerContext, message));
        break;
      case 'message' :
        logger.trace('Receiving message', message.data.type);
        switch (message.data.type) {
          case 'hmacChallenge' :
            NetworkWSInterface.send(recognizerContext, initContext.buildHmacMessage(recognizerContext, message));
            break;
          case 'init' :
            recognizerContextRef.currentReconnectionCount = 0;
            recognizerContextRef.idle = true;
            recognizerContextRef.initialized = true;
            destructuredPromise.resolve(model);
            break;
          case 'reset' :
            recognizerContextRef.idle = true;
            recognitionContext.callback(undefined, recognitionContext.model);
            break;
          case 'mathResult' :
          case 'textResult' :
            recognizerContextRef.idle = true;
            manageResult(recognizerContext, recognitionContext, message);
            break;
          case 'error' :
            logger.debug('Error detected stopping all recognition', message);
            if (recognitionContext) {
              recognitionContext.callback(message.data, recognitionContext.model);
            } else {
              destructuredPromise.reject(Object.assign({}, message.data, { recoverable: false }));
            }
            break;
          default :
            logger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
        }
        break;
      case 'error' :
        logger.debug('Error detected stopping all recognition', message);
        if (recognitionContext) {
          recognitionContext.callback(Object.assign({}, message, { recoverable: false }), recognitionContext.model);
        } else {
          destructuredPromise.reject(Object.assign({}, message, { recoverable: false }));
        }
        break;
      case 'close' :
        logger.debug('Close detected stopping all recognition', message);
        if (recognitionContext) {
          recognitionContext.callback((message.reason && (message.reason === RecognizerContext.CLOSE_RECOGNIZER_MESSAGE)) ? undefined : message, recognitionContext.model, Constants.EventType.CHANGED);
        } else {
          destructuredPromise.reject(message);
        }
        break;
      default :
        logger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
    }
  };
}
