import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkWSInterface from '../../networkHelper/websocket/networkWSInterface';
import * as Cdkv3CommonMathRecognizer from '../common/Cdkv3CommonMathRecognizer';

// Re-use the recognition type for math
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonMathRecognizer';

/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptionsParam, modelParam) {
  const paperOptions = paperOptionsParam;
  const model = modelParam;
  const currentWSMathRecognizer = this;
  const applicationKey = paperOptions.recognitionParams.server.applicationKey;
  let resolve;
  let reject;

  const promise = new Promise(
      (resolveParam, rejectParam) => {
        resolve = resolveParam;
        reject = rejectParam;
      });
  if (!currentWSMathRecognizer.resolveSet) {
    currentWSMathRecognizer.resolveSet = [];
  }
  currentWSMathRecognizer.resolveSet.push({ promiseResolveFunction: resolve, promiseRejectFunction: reject, model });

  /*
   See http://doc.myscript.com/MyScriptCloud/3.1.0/myscript-cloud/protocols.html#websocket-protocol for a complete documentation
   The expected sequence is :
   - Client send applicationKey
   [If hmacKey enable]
   - Server answer with hmacChallenge
   - Client send hmc
   [Whatever the configuration is]
   - Server send init message
   [if no instanceId already set]
   - Client send start message
   - Server send mathResult with instanceId
   [If instanceId already set].
   - Client send continue message
   - Server send mathResult

   TODO

   */

  function buildInitInput() {
    return {
      type: 'applicationKey',
      applicationKey: paperOptions.recognitionParams.server.applicationKey
    };
  }


  function answerToHmacChallengeCallback(serverMessage) {
    return {
      type: 'hmac',
      applicationKey,
      challenge: serverMessage.data.challenge,
      hmac: CryptoHelper.computeHmac(serverMessage.data.challenge, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey)
    };
  }

  const buildContinueInput = () => {
    const params = paperOptions.recognitionParams.mathParameter;

    const input = {
      type: 'continue',
      components: []
    };
    // We add the pending strokes to the model
    InkModel.extractNonRecognizedStrokes(model)
        .forEach(
            (stroke) => {
              input.components.push(StrokeComponent.toJSON(stroke));
            });
    return input;
  };

  const buildStartInput = () => {
    const params = paperOptions.recognitionParams.mathParameter;
    return {
      type: 'start',
      parameters: {
        resultTypes: params.resultTypes,
        isColumnar: params.isColumnar,
        userResources: params.userResources,
        scratchOutDetectionSensitivity: params.scratchOutDetectionSensitivity
      },
      components: buildContinueInput().components
    };
  };

  const simpleCallBack = (payload, error) => {
    logger.debug('payload', payload);
    logger.debug('error', error);
  };


  const processMathResult = (callbackContext, message) => {
    // Memorize instance id
    logger.debug('Cdkv3WSMathRecognizer memorizinf instance id', message.data.instanceId);
    currentWSMathRecognizer.instanceId = message.data.instanceId;
    // Update model
    logger.debug('Cdkv3WSMathRecognizer update model', message.data);
    callbackContext.model.rawResult = message.data;
    // Generate the rendering result
    let updateModel = Cdkv3CommonMathRecognizer.generateRenderingResult(callbackContext.model);
    callbackContext.promiseResolveFunction(updateModel);
  };

  const websocketCallback = (message) => {
    logger.debug('Handling', message.type, message);
    switch (message.type) {
      case 'open' :
        NetworkWSInterface.send(currentWSMathRecognizer.websocket, buildInitInput(paperOptions));
        break;
      case 'message' :
        logger.debug('Functional message', message.data.type);
        switch (message.data.type) {
          case 'hmacChallenge' :
            NetworkWSInterface.send(currentWSMathRecognizer.websocket, answerToHmacChallengeCallback(message));
            break;
          case 'init' :
            NetworkWSInterface.send(currentWSMathRecognizer.websocket, buildStartInput());
            break;
          case 'mathResult' :
            processMathResult(currentWSMathRecognizer.resolveSet.pop());
            break;
          default :
            simpleCallBack(message);
        }
        break;
      default :
        simpleCallBack(message);
    }
  };

  if (!currentWSMathRecognizer.instanceId || !currentWSMathRecognizer.websocket) {
    currentWSMathRecognizer.websocket = NetworkWSInterface.openWebSocket('ws://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/ws/math', websocketCallback);
  } else {
    NetworkWSInterface.send(currentWSMathRecognizer.websocket, buildContinueInput());
  }
  return promise;
}

