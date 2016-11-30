import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkWSInterface from '../../networkHelper/websocket/networkWSInterface';
import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';


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

/**
 * Build the init message.
 * @param paperOptions
 * @returns {{type: string, applicationKey: string}}
 */
function buildInitInput(paperOptions) {
  return {
    type: 'applicationKey',
    applicationKey: paperOptions.recognitionParams.server.applicationKey
  };
}

/**
 * Answer to the hmac challenge by computing it with the hmac.
 * @param serverMessage
 * @param paperOptions
 * @param applicationKey
 * @returns {{type: string, applicationKey: *, challenge: *, hmac: *}}
 */
function answerToHmacChallengeCallback(serverMessage, paperOptions, applicationKey) {
  return {
    type: 'hmac',
    applicationKey,
    challenge: serverMessage.data.challenge,
    hmac: CryptoHelper.computeHmac(serverMessage.data.challenge, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey)
  };
}

/**
 * For debugging purpose only
 * @param payload
 * @param error
 */
function simpleCallBack(payload, error) {
  logger.error('This is something unexpected in current recognizer. Not the type of message we should have here.');
  logger.debug('payload', payload);
  logger.debug('error', error);
}

/**
 * Update the instanceID in the recognizer context to take advantage of incremental recognition.
 * @param recognizerContext
 * @param message
 */
function updateInstanceId(recognizerContext, message) {
  const recognizerContextReference = recognizerContext;
  if (recognizerContextReference.instanceId && recognizerContextReference.instanceId !== message.data.instanceId) {
    logger.error('Instance id switch from ' + recognizerContextReference.instanceId + ' to ' + message.data.instanceId + 'this is suspicious');
  }
  recognizerContextReference.instanceId = message.data.instanceId;
  logger.debug('Cdkv3WSRecognizer memorizing instance id', message.data.instanceId);
}

/**
 * Process a recognition result received by the websocket.
 * @param recognizerContext
 * @param wsMessage
 */
function onResult(recognizerContext, wsMessage) {
  const recognitionContext = recognizerContext.recognitionContexts.shift();
  const enrichRecognizedModel = recognitionContext.processResultFunction(recognitionContext.model, wsMessage.data);
  // Giving back the hand to the InkPaper by resolving the promise.
  recognitionContext.recognitionPromiseCallbacks.resolve(enrichRecognizedModel);
}


/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param destructuredPromise
 * @param recognizerContextReference
 * @param paperOptionsReference
 * @returns {function(*=)}
 */
export function buildWebSocketCallback(destructuredPromise, recognizerContextReference, paperOptionsReference) {
  return (message) => {
    // Handle websocket messages
    const applicationKey = paperOptionsReference.recognitionParams.server.applicationKey;
    logger.debug('Handling', message.type, message);

    switch (message.type) {
      case 'open' :
        NetworkWSInterface.send(recognizerContextReference.websocket, buildInitInput(paperOptionsReference));
        break;
      case 'message' :
        logger.debug('Receiving message', message.data.type);
        switch (message.data.type) {
          case 'hmacChallenge' :
            NetworkWSInterface.send(recognizerContextReference.websocket, answerToHmacChallengeCallback(message, paperOptionsReference, applicationKey));
            break;
          case 'init' :
            destructuredPromise.resolve('Init done');
            break;
          case 'reset' :
            logger.debug('Websocket reset done');
            break;
          case 'mathResult' :
          case 'textResult' :
            updateInstanceId(recognizerContextReference, message);
            onResult(recognizerContextReference, message);
            break;
          default :
            simpleCallBack(message);
            destructuredPromise.reject();
        }
        break;
      case 'close' :
        logger.debug('Websocket close done');
        break;
      default :
        simpleCallBack(message);
    }
  };
}
