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

function resultCallback(recognizerContext, message) {
  logger.debug(`Cdkv4WSRecognizer ${message.data.type} message`, message);
  const recognitionContext = recognizerContext.recognitionContexts[recognizerContext.recognitionContexts.length - 1];
  // Giving back the hand to the editor by resolving the promise.
  recognitionContext.callback(undefined, recognitionContext.model);
}

function modelResultCallback(recognizerContext, message) {
  logger.debug(`Cdkv4WSRecognizer ${message.data.type} message`, message);
  const recognitionContext = recognizerContext.recognitionContexts[recognizerContext.recognitionContexts.length - 1];

  const modelReference = InkModel.updateModelReceivedPosition(recognitionContext.model);
  if (message.data.updates !== undefined) {
    if (modelReference.recognizedSymbols) {
      modelReference.recognizedSymbols.push(...message.data.updates);
    } else {
      modelReference.recognizedSymbols = [...message.data.updates];
    }
    modelReference.rawResults.convert = message.data;
  }
  if (message.data.exports !== undefined) {
    modelReference.rawResults.exports = message.data;
    modelReference.exports = message.data.exports;
  }

  const recognizerContextRef = recognizerContext;
  if (message.data.canUndo !== undefined) {
    recognizerContextRef.canUndo = message.data.canUndo;
  }
  if (message.data.canRedo !== undefined) {
    recognizerContextRef.canRedo = message.data.canRedo;
  }

  logger.debug('Cdkv4WSRecognizer model updated', modelReference);
  // Giving back the hand to the editor by resolving the promise.
  recognitionContext.callback(undefined, modelReference);
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

    switch (message.type) {
      case 'open' :
        destructuredPromise.resolve(model);
        break;
      case 'message' :
        logger.trace('Receiving message', message.data.type);
        switch (message.data.type) {
          case 'ack':
            if (message.data.iinkSessionId) {
              recognizerContextRef.sessionId = message.data.iinkSessionId;
            }
            if (message.data.hmacChallenge) {
              NetworkWSInterface.send(recognizerContext, buildHmac(recognizerContext, message, configuration));
            }
            resultCallback(recognizerContext, message);
            break;
          case 'partChanged' :
            break;
          case 'newPart' :
            if (message.data.id) {
              recognizerContextRef.currentPartId = message.data.id;
            }
            resultCallback(recognizerContext, message);
            break;
          case 'styleClasses' :
            break;
          case 'contentChanged' :
          case 'contentExported' :
          case 'exported' :
          case 'svgPatch' :
            modelResultCallback(recognizerContext, message);
            break;
          case 'error' :
            CdkWSRecognizerUtil.errorCallBack({ msg: 'Websocket connection error', recoverable: false, serverMessage: message.data }, recognizerContext, destructuredPromise);
            break;
          default :
            CdkWSRecognizerUtil.simpleCallBack(message);
            destructuredPromise.reject('Unknown message', recognizerContext, destructuredPromise);
        }
        break;
      case 'close' :
        logger.debug('Websocket close done');
        CdkWSRecognizerUtil.closeCallback(message, recognizerContext, destructuredPromise);
        break;
      case 'error' :
        CdkWSRecognizerUtil.errorCallBack({ msg: 'Websocket connection error', recoverable: false }, recognizerContext, destructuredPromise);
        break;
      default :
        CdkWSRecognizerUtil.simpleCallBack(message);
    }
  };
}
