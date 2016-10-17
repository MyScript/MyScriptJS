import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as Cdkv3CommonAnalyzerRecognizer from '../common/Cdkv3CommonAnalyzerRecognizer';

// Re-use the recognition type for shape
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonAnalyzerRecognizer';

export function getType() {
  return MyScriptJSConstants.RecognitionType.ANALYZER;
}

export function getProtocol() {
  return MyScriptJSConstants.Protocol.REST;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param paperOptions
 * @param model
 * @param analyzerInstanceId
 * @returns {{applicationKey: string}}
 * @private
 */
function buildInput(paperOptions, model, analyzerInstanceId) {
  const data = {
    applicationKey: paperOptions.recognitionParams.server.applicationKey,
    instanceId: analyzerInstanceId
  };

  const analyzerInput = {
    parameter: {
      // FIXME Manage the various parameters
      textParameter: {
        textProperties: {},
        language: 'en_US',
        textInputMode: MyScriptJSConstants.InputMode.CURSIVE
      }
    },
    components: []
  };

  // As Rest Text recognition is non incremental wa add the already recognized strokes
  model.recognizedStrokes.forEach((stroke) => {
    analyzerInput.components.push(StrokeComponent.toJSON(stroke));
  });

  // We add the pending strokes to the model
  InkModel.extractNonRecognizedStrokes(model).forEach((stroke) => {
    analyzerInput.components.push(StrokeComponent.toJSON(stroke));
  });

  data.analyzerInput = JSON.stringify(analyzerInput);
  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.analyzerInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
  }
  return data;
}

/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @returns {Promise} Promise that return an updated model as a result
 */
export function recognize(paperOptionsParam, modelParam) {
  const paperOptions = paperOptionsParam;
  const model = modelParam;
  const currentRestAnalyzerRecognizer = this;

  const data = buildInput(paperOptions, modelParam, currentRestAnalyzerRecognizer.analyzerInstanceId);

  // FIXME manage http mode
  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data)
      .then(
          // logResponseOnSuccess
          (response) => {
            logger.debug('Cdkv3RestAnalyzerRecognizer success', response);
            return response;
          }
      )
      .then(
          // memorizeInstanceId
          (response) => {
            currentRestAnalyzerRecognizer.analyzerInstanceId = response.instanceId;
            return response;
          }
      )
      .then(
          // updateModel
          (response) => {
            logger.debug('Cdkv3RestAnalyzerRecognizer update model', response);
            model.rawResult = response;
            return model;
          }
      )
      .then(
          // Generate the rendering result
          Cdkv3CommonAnalyzerRecognizer.generateRenderingResult);
}
