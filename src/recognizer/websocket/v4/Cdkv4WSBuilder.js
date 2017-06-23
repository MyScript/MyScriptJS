import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkWSInterface from '../networkWSInterface';
import * as CryptoHelper from '../../CryptoHelper';
import * as InkModel from '../../../model/InkModel';
import * as CdkWSRecognizerUtil from '../CdkWSRecognizerUtil';

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

function buildHmac(recognizerContext, message, configuration) {
  return {
    type: 'hmac',
    hmac: CryptoHelper.computeHmac(message.data.hmacChallenge, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey)
  };
}

function manageContentChange(recognizerContext, recognitionContext, message) {
  const recognizerContextRef = recognizerContext;
  if (message.data.canUndo !== undefined) {
    recognizerContextRef.canUndo = message.data.canUndo;
  }
  if (message.data.canRedo !== undefined) {
    recognizerContextRef.canRedo = message.data.canRedo;
  }
  recognitionContext.callback(undefined, InkModel.updateModelReceivedPosition(recognitionContext.model));
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
  recognitionContext.callback(undefined, recognitionContext.model);
}

/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {DestructuredPromise} destructuredPromise
 * @return {function} Callback to handle WebSocket results
 */
export function buildWebSocketCallback(configuration, model, recognizerContext, destructuredPromise) {
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
        destructuredPromise.resolve(model);
        break;
      case 'message' :
        logger.debug(`Receiving ${message.data.type} message`, message);
        switch (message.data.type) {
          case 'ack':
            if (message.data.hmacChallenge) {
              NetworkWSInterface.send(recognizerContext, buildHmac(recognizerContext, message, configuration));
            }
            if (message.data.iinkSessionId) {
              recognizerContextRef.sessionId = message.data.iinkSessionId;
            }
            recognitionContext.callback(undefined, recognitionContext.model);
            break;
          case 'newPart' :
            if (message.data.id) {
              recognizerContextRef.currentPartId = message.data.id;
            }
            recognitionContext.callback(undefined, recognitionContext.model);
            break;
          case 'contentPackageDescription':
            break;
          case 'contentChanged' :
            manageContentChange(recognizerContext, recognitionContext, message);
            break;
          case 'exported' :
            manageExport(recognizerContext, recognitionContext, message);
            break;
          case 'svgPatch' :
            manageSvgPatch(recognizerContext, recognitionContext, message);
            break;
          case 'idle':
            recognizerContextRef.idle = true;
            recognitionContext.callback(undefined, recognitionContext.model);
            break;
          case 'error' :
            logger.debug('Error detected stopping all recognition', message);
            recognitionContext.callback(errorMessage, recognitionContext.model);
            destructuredPromise.reject(errorMessage);
            break;
          default :
            logger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
            destructuredPromise.reject({ msg: 'Unknown message', serverMessage: message.data });
        }
        break;
      case 'error' :
        logger.debug('Error detected stopping all recognition', message);
        recognitionContext.callback(errorMessage, recognitionContext.model);
        destructuredPromise.reject(errorMessage);
        break;
      case 'close' :
        logger.debug('Close detected stopping all recognition', message);
        recognizerContextRef.canRedo = false;
        recognizerContextRef.canUndo = false;
        recognitionContext.callback(undefined, recognitionContext.model);
        destructuredPromise.reject(message);
        break;
      default :
        logger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
    }
  };
}
