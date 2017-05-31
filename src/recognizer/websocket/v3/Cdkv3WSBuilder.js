import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkWSInterface from '../networkWSInterface';
import * as CryptoHelper from '../../CryptoHelper';
import * as InkModel from '../../../model/InkModel';
import * as CdkWSRecognizerUtil from '../CdkWSRecognizerUtil';

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

function buildHmac(recognizerContext, message, configuration) {
  return {
    type: 'hmac',
    applicationKey: configuration.recognitionParams.server.applicationKey,
    challenge: message.data.challenge,
    hmac: CryptoHelper.computeHmac(message.data.challenge, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey)
  };
}

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
  }
  recognitionContext.callback(undefined, InkModel.updateModelReceivedPosition(recognitionContext.model));
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
        logger.trace('Receiving message', message.data.type);
        switch (message.data.type) {
          case 'hmacChallenge' :
            NetworkWSInterface.send(recognizerContext, buildHmac(recognizerContext, message, configuration));
            break;
          case 'init' :
          case 'reset' :
            recognitionContext.callback(undefined, recognitionContext.model);
            break;
          case 'mathResult' :
          case 'textResult' :
            manageResult(recognizerContext, recognitionContext, message);
            break;
          case 'error' :
            recognitionContext.callback(errorMessage, recognitionContext.model);
            destructuredPromise.reject(errorMessage);
            break;
          default :
            logger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
            destructuredPromise.reject({ msg: 'Unknown message', serverMessage: message.data });
        }
        break;
      case 'close' :
        logger.debug('Websocket close done');
        recognitionContext.callback(message, recognitionContext.model);
        destructuredPromise.reject(message);
        break;
      case 'error' :
        recognitionContext.callback(errorMessage, recognitionContext.model);
        destructuredPromise.reject(errorMessage);
        break;
      default :
        logger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
    }
  };
}
