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

function resultCallback(recognizerContext, message) {
  logger.debug(`Cdkv3WSRecognizer ${message.data.type} message`, message);
  const recognitionContext = recognizerContext.recognitionContexts[recognizerContext.recognitionContexts.length - 1];

  const modelReference = InkModel.updateModelReceivedPosition(recognitionContext.model);
  if (message.data.instanceId) {
    if (recognizerContext.instanceId && recognizerContext.instanceId !== message.data.instanceId) {
      logger.debug(`Instance id switch from ${recognizerContext.instanceId} to ${message.data.instanceId} this is suspicious`);
    }
    const recognizerContextReference = recognizerContext;
    recognizerContextReference.instanceId = message.data.instanceId;
    logger.debug('Cdkv3WSRecognizer memorizing instance id', message.data.instanceId);

    modelReference.rawResults.exports = message.data;

    logger.debug('Cdkv3WSRecognizer model updated', modelReference);
  }
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
    // Handle websocket messages
    logger.trace(`${message.type} websocket callback`, message);

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
          case 'mathResult' :
          case 'textResult' :
            resultCallback(recognizerContext, message);
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
