import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkWSInterface from '../networkWSInterface';
import * as RecognizerContext from '../../../model/RecognizerContext';
import * as InkModel from '../../../model/InkModel';
import Constants from '../../../configuration/Constants';

/**
 * A CDK v4 websocket dialog have this sequence :
 * ---------- Client ------------------------------------- Server ----------------------------------
 * init (send the new content package) ================>
 *                                       <=========== hmacChallenge
 * answerToHmacChallenge (send the hmac) =========>
 * newPart (send the parameters ) ===============>
 *                                       <=========== update
 * addStrokes (send the strokes ) ============>
 *                                       <=========== update
 */

function manageContentChange(recognizerContext, recognitionContext, message) {
  const recognizerContextRef = recognizerContext;
  if (message.data.canUndo !== undefined) {
    recognizerContextRef.canUndo = message.data.canUndo;
  }
  if (message.data.canRedo !== undefined) {
    recognizerContextRef.canRedo = message.data.canRedo;
  }
  recognitionContext.callback(undefined, InkModel.updateModelReceivedPosition(recognitionContext.model), Constants.EventType.CHANGED);
}

function manageSvgPatch(recognizerContext, recognitionContext, message) {
  const modelReference = recognitionContext.model;
  if (message.data.updates !== undefined) {
    if (modelReference.recognizedSymbols) {
      modelReference.recognizedSymbols.push(...message.data.updates);
    } else {
      modelReference.recognizedSymbols = [...message.data.updates];
    }
    modelReference.rawResults.convert = message.data;
  }
  recognitionContext.callback(undefined, recognitionContext.model);
}

function manageExport(recognizerContext, recognitionContext, message) {
  const modelReference = recognitionContext.model;
  if (message.data.exports !== undefined) {
    modelReference.rawResults.exports = message.data;
    modelReference.exports = message.data.exports;
  }
  recognitionContext.callback(undefined, recognitionContext.model, Constants.EventType.EXPORTED);
}

/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param {DestructuredPromise} destructuredPromise
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {InitializationContext} initContext Initialization structure
 * @return {function} Callback to handle WebSocket results
 */
export function buildWebSocketCallback(destructuredPromise, configuration, model, recognizerContext, initContext) {
  return (message) => {
    const recognizerContextRef = recognizerContext;
    // Handle websocket messages
    logger.trace(`${message.type} websocket callback`, message);
    const recognitionContext = recognizerContext.recognitionContexts[recognizerContext.recognitionContexts.length - 1];
    logger.debug('Current recognition context', recognitionContext);

    const errorMessage = {
      msg: 'Websocket connection error',
      recoverable: false,
      serverMessage: message.data ? message.data : undefined
    };

    switch (message.type) {
      case 'open' :
        NetworkWSInterface.send(recognizerContext, initContext.buildInitMessage(recognizerContext, message, configuration));
        break;
      case 'message' :
        logger.debug(`Receiving ${message.data.type} message`, message);
        switch (message.data.type) {
          case 'ack':
            if (message.data.hmacChallenge) {
              NetworkWSInterface.send(recognizerContext, initContext.buildHmacMessage(recognizerContext, message, configuration));
            }
            if (message.data.iinkSessionId) {
              recognizerContextRef.sessionId = message.data.iinkSessionId;
            }
            break;
          case 'newPart' :
            break;
          case 'contentPackageDescription':
            recognizerContextRef.currentReconnectionCount = 0;
            recognizerContextRef.contentPartCount = message.data.contentPartCount;
            NetworkWSInterface.send(recognizerContext, initContext.buildConfiguration(recognizerContext, message, configuration));
            if (recognizerContextRef.currentPartId) { // FIXME: Ugly hack to resolve init promise after opening part
              NetworkWSInterface.send(recognizerContext, initContext.buildOpenContentPart(recognizerContext, message, configuration));
            } else {
              NetworkWSInterface.send(recognizerContext, initContext.buildNewContentPart(recognizerContext, message, configuration));
            }
            break;
          case 'partChanged' :
            if (message.data.partId) {
              recognizerContextRef.currentPartId = message.data.partId;
            }
            recognizerContextRef.initialized = true;
            destructuredPromise.resolve(model);
            break;
          case 'contentChanged' :
            manageContentChange(recognizerContext, recognitionContext, message);
            break;
          case 'exported' :
            manageExport(recognizerContext, recognitionContext, message);
            break;
          case 'svgPatch' :
            manageSvgPatch(recognizerContext, recognitionContext || initContext, message);
            break;
          case 'idle':
            recognizerContextRef.idle = true;
            recognitionContext.callback(undefined, recognitionContext.model);
            break;
          case 'error' :
            logger.debug('Error detected stopping all recognition', message);
            if (recognitionContext) {
              recognitionContext.callback(errorMessage, recognitionContext.model);
            } else {
              destructuredPromise.reject(errorMessage);
            }
            break;
          default :
            logger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
        }
        break;
      case 'error' :
        logger.debug('Error detected stopping all recognition', message);
        if (recognitionContext) {
          recognitionContext.callback(errorMessage, recognitionContext.model);
        } else {
          destructuredPromise.reject(errorMessage);
        }
        break;
      case 'close' :
        logger.debug('Close detected stopping all recognition', message);
        recognizerContextRef.canRedo = false;
        recognizerContextRef.canUndo = false;
        if (recognitionContext) {
          recognitionContext.callback((message.reason && (message.reason === RecognizerContext.CLOSE_RECOGNIZER_MESSAGE)) ? undefined : message, recognitionContext.model);
        } else {
          destructuredPromise.reject(message);
        }
        break;
      default :
        logger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
    }
  };
}
