import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkWSInterface from '../networkWSInterface';
import * as RecognizerContext from '../../../model/RecognizerContext';
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

function buildHmacMessage(configuration, message) {
  return {
    type: 'hmac',
    applicationKey: configuration.recognitionParams.server.applicationKey,
    challenge: message.data.challenge,
    hmac: CryptoHelper.computeHmac(message.data.challenge, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey)
  };
}

function buildInitMessage(configuration) {
  return {
    type: 'applicationKey',
    applicationKey: configuration.recognitionParams.server.applicationKey
  };
}

/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param {DestructuredPromise} destructuredPromise
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {function} Callback to handle WebSocket results
 */
export function buildWebSocketCallback(destructuredPromise, recognizerContext) {
  return (message) => {
    const recognizerContextRef = recognizerContext;
    // Handle websocket messages
    logger.trace(`${message.type} websocket callback`, message);
    const recognitionContext = recognizerContext.recognitionContexts[recognizerContext.recognitionContexts.length - 1];
    logger.debug('Current recognition context', recognitionContext);

    switch (message.type) {
      case 'open' :
        NetworkWSInterface.send(recognizerContext, buildInitMessage(recognizerContext.editor.configuration));
        break;
      case 'message' :
        logger.trace('Receiving message', message.data.type);
        switch (message.data.type) {
          case 'hmacChallenge' :
            NetworkWSInterface.send(recognizerContext, buildHmacMessage(recognizerContext.editor.configuration, message));
            break;
          case 'init' :
            recognizerContextRef.currentReconnectionCount = 0;
            recognizerContextRef.idle = true;
            recognizerContextRef.initialized = true;
            recognitionContext.callback(undefined, message.data);
            destructuredPromise.resolve(recognitionContext);
            break;
          case 'reset' :
            recognizerContextRef.idle = true;
            recognitionContext.callback(undefined, message.data);
            break;
          case 'mathResult' :
          case 'textResult' :
            recognizerContextRef.idle = true;
            if (message.data.instanceId) {
              if (recognizerContext.instanceId && recognizerContext.instanceId !== message.data.instanceId) {
                logger.debug(`Instance id switch from ${recognizerContext.instanceId} to ${message.data.instanceId} this is suspicious`);
              }
              recognizerContextRef.instanceId = message.data.instanceId;
              logger.debug('Memorizing instance id', message.data.instanceId);
            }
            recognitionContext.callback(undefined, message.data);
            break;
          case 'error' :
            logger.debug('Error detected stopping all recognition', message);
            if (recognitionContext) {
              recognitionContext.callback(message.data);
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
          recognitionContext.callback(Object.assign({}, message, { recoverable: false }));
        } else {
          destructuredPromise.reject(Object.assign({}, message, { recoverable: false }));
        }
        break;
      case 'close' :
        logger.debug('Close detected stopping all recognition', message);
        recognizerContextRef.initialized = false;
        if (recognitionContext) {
          recognitionContext.callback(undefined, message);
        } else {
          destructuredPromise.reject(message);
        }
        break;
      default :
        logger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
    }
  };
}
