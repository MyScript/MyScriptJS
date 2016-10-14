import * as CryptoHelper from '../../CryptoHelper';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkWSInterface from '../../networkHelper/websocket/networkWSInterface';
import { modelLogger as logger } from '../../../configuration/LoggerConfig';

export function extractPendingStrokesAsComponentArray(modelInput) {
  // We add the pending strokes to the model
  const components = [];

  InkModel.extractNonRecognizedStrokes(modelInput)
      .forEach(
          (stroke) => {
            components.push(StrokeComponent.toJSON(stroke));
          });
  return components;
}

export function buildInitInput(paperOptions) {
  return {
    type: 'applicationKey',
    applicationKey: paperOptions.recognitionParams.server.applicationKey
  };
}

export function answerToHmacChallengeCallback(serverMessage, paperOptions, applicationKey) {
  return {
    type: 'hmac',
    applicationKey,
    challenge: serverMessage.data.challenge,
    hmac: CryptoHelper.computeHmac(serverMessage.data.challenge, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey)
  };
}

export function simpleCallBack(payload, error) {
  logger.error('This is something unexpected in current recognizer. Not the type of message we should have here.');
  logger.debug('payload', payload);
  logger.debug('error', error);
}

function updateInstanceId(webSocketContext, message) {
  if (webSocketContext.instanceId && webSocketContext.instanceId !== message.data.instanceId) {
    logger.error('Instace id switch from ' + webSocketContext.instanceId + ' to ' + message.data.instanceId + 'this is suspicious');
  }
  logger.debug('Cdkv3WSMathRecognizer memorizinf instance id', message.data.instanceId);
  webSocketContext.instanceId = message.data.instanceId;
}


export function recognize(url, paperOptionsParam, modelParam, webSocketContext, buildStartInputFunction, buildContinueInputFunction, processResultFunction) {
  const paperOptions = paperOptionsParam;
  const model = modelParam;
  const currentWSRecognizer = this;
  const applicationKey = paperOptions.recognitionParams.server.applicationKey;
  let resolve;
  let reject;

  const promise = new Promise(
      (resolveParam, rejectParam) => {
        resolve = resolveParam;
        reject = rejectParam;
      });
  if (!currentWSRecognizer.resolveSet) {
    currentWSRecognizer.resolveSet = [];
  }
  currentWSRecognizer.resolveSet.push({ promiseResolveFunction: resolve, promiseRejectFunction: reject, model });


  const websocketCallback = (message) => {
    logger.debug('Handling', message.type, message);
    switch (message.type) {
      case 'open' :
        NetworkWSInterface.send(webSocketContext.websocket, buildInitInput(paperOptions));
        break;
      case 'message' :
        logger.debug('Functional message', message.data.type);
        switch (message.data.type) {
          case 'hmacChallenge' :
            NetworkWSInterface.send(webSocketContext.websocket, answerToHmacChallengeCallback(message, paperOptions, applicationKey));
            break;
          case 'init' :
            NetworkWSInterface.send(webSocketContext.websocket, buildStartInputFunction());
            break;
          case 'mathResult' :
          case 'textResult' :
            updateInstanceId(webSocketContext, message);
            processResultFunction(currentWSRecognizer.resolveSet.pop(), message);
            break;
          default :
            simpleCallBack(message);
        }
        break;
      default :
        simpleCallBack(message);
    }
  };

  if (!webSocketContext.instanceId || !webSocketContext.websocket) {
    // paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/ws/math'
    webSocketContext.websocket = NetworkWSInterface.openWebSocket(url, websocketCallback);
  } else {
    NetworkWSInterface.send(webSocketContext.websocket, buildContinueInputFunction(model));
  }
  return promise;
}
