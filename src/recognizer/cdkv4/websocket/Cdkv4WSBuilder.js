import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

function simpleCallBack(payload, error) {
  logger.error('This is something unexpected in current recognizer. Not the type of message we should have here.');
  logger.debug('payload', payload);
  logger.debug('error', error);
}

function onResult(recognizerContext, message) {
  logger.debug('Cdkv4WSRecognizer success', message);
  const recognitionContext = recognizerContext.recognitionContexts[recognizerContext.recognitionContexts.length - 1];
  logger.debug('Cdkv4WSRecognizer update model', message);

  const modelReference = recognitionContext.model;
  modelReference.rawResult = message.data;
  switch (message.data.type) {
    case 'svgPatch' :
      modelReference.renderingActions.push(...message.data.updates);
      break;
    case 'partChanged' :
    case 'newPart' :
    case 'contentChanged' :
      logger.debug('Nothing to do', message);
      break;
    default :
      logger.debug('Nothing to do', message);
  }
  // Giving back the hand to the InkPaper by resolving the promise.
  recognitionContext.recognitionPromiseCallbacks.resolve(modelReference);
}

/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param {DestructuredPromise} destructuredPromise
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {function} Callback to handle WebSocket results
 */
export function buildWebSocketCallback(destructuredPromise, recognizerContext) {
  return (message) => {
    // Handle websocket messages
    logger.debug('Handling', message.type, message);

    switch (message.type) {
      case 'open' :
        // TODO Add the challenge
        destructuredPromise.resolve('Init done');
        break;
      case 'message' :
        logger.debug('Receiving message', message.data.type);
        switch (message.data.type) {
          case 'partChanged' :
          case 'newPart' :
          case 'contentChanged' :
          case 'svgPatch' :
            onResult(recognizerContext, message);
            break;
          default :
            simpleCallBack(message);
            destructuredPromise.reject('Unknown message');
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
