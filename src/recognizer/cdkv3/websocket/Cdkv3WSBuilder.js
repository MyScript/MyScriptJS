import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
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

function buildInitInput(paperOptions) {
  return {
    type: 'applicationKey',
    applicationKey: paperOptions.recognitionParams.server.applicationKey
  };
}

function answerToHmacChallengeCallback(serverMessage, paperOptions, applicationKey) {
  return {
    type: 'hmac',
    applicationKey,
    challenge: serverMessage.data.challenge,
    hmac: CryptoHelper.computeHmac(serverMessage.data.challenge, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey)
  };
}

function simpleCallBack(payload, error) {
  logger.error('This is something unexpected in current recognizer. Not the type of message we should have here.');
  logger.debug('payload', payload);
  logger.debug('error', error);
}

function updateInstanceId(recognizerContext, message) {
  const recognizerContextReference = recognizerContext;
  if (recognizerContextReference.instanceId && recognizerContextReference.instanceId !== message.data.instanceId) {
    logger.error('Instance id switch from ' + recognizerContextReference.instanceId + ' to ' + message.data.instanceId + 'this is suspicious');
  }
  recognizerContextReference.instanceId = message.data.instanceId;
  logger.debug('Cdkv3WSRecognizer memorizing instance id', message.data.instanceId);
}

function onResult(recognizerContext, message) {
  const recognitionContext = recognizerContext.recognitionContexts.shift();
  const enrichRecognizedModel = recognitionContext.processResultFunction(recognitionContext.model, message.data);
  // Giving back the hand to the InkPaper by resolving the promise.
  recognitionContext.recognitionPromiseCallbacks.resolve(enrichRecognizedModel);
}

/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param destructuredPromise
 * @param {RecognitionContext} recognizerContext
 * @param {Parameters} paperOptions
 * @returns {*}
 */
export function buildWebSocketCallback(destructuredPromise, recognizerContext, paperOptions) {
  return (message) => {
    // Handle websocket messages
    const applicationKey = paperOptions.recognitionParams.server.applicationKey;
    logger.debug('Handling', message.type, message);

    switch (message.type) {
      case 'open' :
        NetworkWSInterface.send(recognizerContext.websocket, buildInitInput(paperOptions));
        break;
      case 'message' :
        logger.debug('Receiving message', message.data.type);
        switch (message.data.type) {
          case 'hmacChallenge' :
            NetworkWSInterface.send(recognizerContext.websocket, answerToHmacChallengeCallback(message, paperOptions, applicationKey));
            break;
          case 'init' :
            destructuredPromise.resolve('Init done');
            break;
          case 'reset' :
            logger.debug('Websocket reset done');
            break;
          case 'mathResult' :
          case 'textResult' :
            updateInstanceId(recognizerContext, message);
            onResult(recognizerContext, message);
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
