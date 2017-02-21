import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as InkModel from '../../../model/InkModel';
import * as NetworkWSInterface from '../../networkHelper/websocket/networkWSInterface';
import * as CryptoHelper from '../../CryptoHelper';

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

function buildInitMessage(options) {
  return {
    type: 'applicationKey',
    applicationKey: options.recognitionParams.server.applicationKey
  };
}

function buildAnswerToHmacChallengeMessage(serverMessage, options) {
  return {
    type: 'hmac',
    applicationKey: options.recognitionParams.server.applicationKey,
    challenge: serverMessage.data.challenge,
    hmac: CryptoHelper.computeHmac(serverMessage.data.challenge, options.recognitionParams.server.applicationKey, options.recognitionParams.server.hmacKey)
  };
}

function simpleCallBack(payload) {
  logger.info('This is something unexpected in current recognizer. Not the type of message we should have here.', payload);
}

function errorCallBack(errorDetail, recognizerContext, destructuredPromise) {
  logger.debug('Error detected stopping all recognition', errorDetail);
  if (recognizerContext && recognizerContext.recognitionContexts && recognizerContext.recognitionContexts.length > 0) {
    recognizerContext.recognitionContexts.shift().recognitionPromiseCallbacks.reject(errorDetail);
  }
  if (destructuredPromise) {
    destructuredPromise.reject(errorDetail);
  }
  // Giving back the hand to the InkPaper by resolving the promise.
}

function resultCallback(recognizerContext, message) {
  logger.debug('Cdkv3WSRecognizer success', message);

  if (recognizerContext.instanceId && recognizerContext.instanceId !== message.data.instanceId) {
    logger.debug(`Instance id switch from ${recognizerContext.instanceId} to ${message.data.instanceId} this is suspicious`);
  }
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.instanceId = message.data.instanceId;
  logger.debug('Cdkv3WSRecognizer memorizing instance id', message.data.instanceId);

  const recognitionContext = recognizerContextReference.recognitionContexts.shift();
  const modelReference = InkModel.updateModelReceivedPosition(recognitionContext.model);
  modelReference.rawResults.recognition = message.data;

  logger.debug('Cdkv3WSRecognizer model updated', modelReference);
  // Giving back the hand to the InkPaper by resolving the promise.
  recognitionContext.recognitionPromiseCallbacks.resolve(modelReference);
}

/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param {DestructuredPromise} destructuredPromise
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Options} options Current configuration
 * @return {function} Callback to handle WebSocket results
 */
export function buildWebSocketCallback(destructuredPromise, recognizerContext, options) {
  return (message) => {
    // Handle websocket messages
    logger.debug('Handling', message.type, message);

    switch (message.type) {
      case 'open' :
        NetworkWSInterface.send(recognizerContext, buildInitMessage(options));
        break;
      case 'message' :
        logger.debug('Receiving message', message.data.type);
        switch (message.data.type) {
          case 'hmacChallenge' :
            NetworkWSInterface.send(recognizerContext, buildAnswerToHmacChallengeMessage(message, options));
            break;
          case 'init' :
            destructuredPromise.resolve('Init done');
            break;
          case 'reset' :
            logger.debug('Websocket reset done');
            break;
          case 'mathResult' :
          case 'textResult' :
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
