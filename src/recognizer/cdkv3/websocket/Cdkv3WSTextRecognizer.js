import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
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

  const buildStartInput = () => {
    const params = paperOptions.recognitionParams.textParameter;

    var inputUnits = [];
    if (components && components.length > 0) {
      if (components[0].hasOwnProperty('components')) {
        inputUnits = components;
      } else {
        var unit = {
          textInputType: 'MULTI_LINE_TEXT',
          components: components
        };
        inputUnits.push(unit);
      }
    }
    this.sendMessage({
                       type: 'start',
                       textParameter: params,
                       inputUnits: inputUnits
                     });

    return {
      type: 'start',
      parameters: {
        resultTypes: params.resultTypes,
        isColumnar: params.isColumnar,
        userResources: params.userResources,
        scratchOutDetectionSensitivity: params.scratchOutDetectionSensitivity
      },
      inputUnits: Cdkv3WSRecognizerUtil.buildContinueInput(model).components
    };
  };

  const processMathResult = (callbackContext, message) => {
    // Memorize instance id
    const modelUnderRecognition = callbackContext.model;
    logger.debug('Cdkv3WSMathRecognizer memorizinf instance id', message.data.instanceId);
    currentWSMathRecognizer.instanceId = message.data.instanceId;
    // Update model
    logger.debug('Cdkv3WSMathRecognizer update model', message.data);

    modelUnderRecognition.rawResult = message.data;
    // Generate the rendering result
    const updateModel = Cdkv3CommonMathRecognizer.generateRenderingResult(callbackContext.model);
    callbackContext.promiseResolveFunction(updateModel);
  };

  const websocketCallback = (message) => {
    logger.debug('Handling', message.type, message);
    switch (message.type) {
      case 'open' :
        NetworkWSInterface.send(currentWSMathRecognizer.websocket, Cdkv3WSRecognizerUtil.buildInitInput(paperOptions));
        break;
      case 'message' :
        logger.debug('Functional message', message.data.type);
        switch (message.data.type) {
          case 'hmacChallenge' :
            NetworkWSInterface.send(currentWSMathRecognizer.websocket, Cdkv3WSRecognizerUtil.answerToHmacChallengeCallback(message, paperOptions, applicationKey));
            break;
          case 'init' :
            NetworkWSInterface.send(currentWSMathRecognizer.websocket, buildStartInput());
            break;
          case 'mathResult' :
            processMathResult(currentWSMathRecognizer.resolveSet.pop(), message);
            break;
          default :
            Cdkv3WSRecognizerUtil.simpleCallBack(message);
        }
        break;
      default :
        Cdkv3WSRecognizerUtil.simpleCallBack(message);
    }
  };

  if (!currentWSMathRecognizer.instanceId || !currentWSMathRecognizer.websocket) {
    currentWSMathRecognizer.websocket = NetworkWSInterface.openWebSocket(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/ws/text', websocketCallback);
  } else {
    NetworkWSInterface.send(currentWSMathRecognizer.websocket, Cdkv3WSRecognizerUtil.buildContinueInput(model));
  }
  return promise;
}

