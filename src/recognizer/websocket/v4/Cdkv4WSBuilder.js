import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkWSInterface from '../networkWSInterface';
import * as CryptoHelper from '../../CryptoHelper';
import * as InkModel from '../../../model/InkModel';

function buildHmac(recognizerContext, message, options) {
  return {
    type: 'hmac',
    hmac: CryptoHelper.computeHmac(message.data.hmacChallenge, options.recognitionParams.server.applicationKey, options.recognitionParams.server.hmacKey)
  };
}

function simpleCallBack(payload) {
  logger.info('This is something unexpected in current recognizer. Not the type of message we should have here.', payload);
}

function errorCallBack(errorDetail, recognizerContext, destructuredPromise) {
  logger.debug('Error detected stopping all recognition', errorDetail);
  if (recognizerContext && recognizerContext.recognitionContexts && recognizerContext.recognitionContexts.length > 0) {
    recognizerContext.recognitionContexts.shift().callback(errorDetail);
  }
  if (destructuredPromise) {
    destructuredPromise.reject(errorDetail);
  }
  // Giving back the hand to the InkPaper by resolving the promise.
}

function resultCallback(recognizerContext, message) {
  const messageRef = message;
  logger.debug('Cdkv4WSRecognizer success', message);
  const recognitionContext = recognizerContext.recognitionContexts[recognizerContext.recognitionContexts.length - 1];

  const modelReference = InkModel.updateModelReceivedPosition(recognitionContext.model);
  switch (message.data.type) {
    case 'ack':
      messageRef.data.canUndo = false;
      messageRef.data.canRedo = false;
      messageRef.data.canClear = messageRef.data.canUndo && modelReference.rawStrokes.length > 0;
      modelReference.rawResults.state = messageRef.data;
      break;
    case 'svgPatch' :
      modelReference.rawResults.typeset = message.data;
      if (modelReference.recognizedSymbols) {
        modelReference.recognizedSymbols.push(...message.data.updates);
      } else {
        modelReference.recognizedSymbols = [...message.data.updates];
      }
      break;
    case 'contentChanged' :
      messageRef.data.canClear = messageRef.data.canUndo && modelReference.rawStrokes.length > 0;
      modelReference.rawResults.state = messageRef.data;
      if (messageRef.data.recognitionResult) {
        modelReference.rawResults.recognition = messageRef.data;
      }
      break;
    case 'partChanged' :
    case 'newPart' :
      logger.debug('Nothing to do', message);
      break;
    default :
      logger.debug('Nothing to do', message);
  }
  logger.debug('Cdkv4WSRecognizer model updated', modelReference);
  // Giving back the hand to the InkPaper by resolving the promise.
  recognitionContext.callback(undefined, modelReference);
}

/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {DestructuredPromise} destructuredPromise
 * @return {function} Callback to handle WebSocket results
 */
export function buildWebSocketCallback(options, model, recognizerContext, destructuredPromise) {
  return (message) => {
    // Handle websocket messages
    logger.debug('Handling', message.type, message);

    switch (message.type) {
      case 'open' :
        destructuredPromise.resolve(model);
        break;
      case 'message' :
        logger.debug('Receiving message', message.data.type);
        switch (message.data.type) {
          case 'ack':
            if (message.data.hmacChallenge) {
              NetworkWSInterface.send(recognizerContext, buildHmac(recognizerContext, message, options));
            }
            resultCallback(recognizerContext, message);
            break;
          case 'partChanged' :
          case 'newPart' :
          case 'contentChanged' :
          case 'svgPatch' :
            resultCallback(recognizerContext, message);
            break;
          case 'error' :
            errorCallBack({ msg: 'Websocket connection error', recoverable: false, serverMessage: message.data }, recognizerContext, destructuredPromise);
            break;
          default :
            simpleCallBack(message);
            destructuredPromise.reject('Unknown message', recognizerContext, destructuredPromise);
        }
        break;
      case 'close' :
        logger.debug('Websocket close done');
        break;
      case 'error' :
        errorCallBack({ msg: 'Websocket connection error', recoverable: false }, recognizerContext, destructuredPromise);
        break;
      default :
        simpleCallBack(message);
    }
  };
}
