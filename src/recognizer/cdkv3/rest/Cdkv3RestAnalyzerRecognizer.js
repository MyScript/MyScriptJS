import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as CryptoHelper from '../../CryptoHelper';
import {
  updateSentRecognitionPositions,
  resetRecognitionPositions
} from '../../../model/RecognizerContext';
import { extractShapeSymbols, getStyleFromInkRanges } from '../common/Cdkv3CommonShapeRecognizer';

export { init, close } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const analyzerRestV3Configuration = {
  type: MyScriptJSConstants.RecognitionType.ANALYZER,
  protocol: MyScriptJSConstants.Protocol.REST,
  apiVersion: 'V3',
  availableTriggers: [
    MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD,
    MyScriptJSConstants.RecognitionTrigger.DEMAND
  ],
  preferredTrigger: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return analyzerRestV3Configuration;
}

function buildInput(options, model, instanceId) {
  const input = {
    // Incremental
    components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, { parameter: options.recognitionParams.analyzerParameter }); // Building the input with the suitable parameters

  InkModel.updateModelSentPosition(model);
  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId,
    applicationKey: options.recognitionParams.server.applicationKey,
    analyzerInput: JSON.stringify(input)
  };

  if (options.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.analyzerInput, options.recognitionParams.server.applicationKey, options.recognitionParams.server.hmacKey);
  }
  return data;
}

function extractSymbols(model, element) {
  const style = getStyleFromInkRanges(model, element.inkRanges);
  switch (element.elementType) {
    case 'table':
      return element.lines.map(line => Object.assign(line, style));
    case 'textLine':
      return [element].map(textLine => Object.assign(textLine, textLine.result.textSegmentResult.candidates[textLine.result.textSegmentResult.selectedCandidateIdx], style));
    case 'shape':
      return extractShapeSymbols(model, element).map(primitive => Object.assign(primitive, style));
    default:
      return [];
  }
}

function extractRecognizedSymbolsFromAnalyzerResult(model) {
  const result = model.rawResult.result;
  if (result) {
    return [...result.shapes, ...result.tables, ...result.textLines]
        .map(element => extractSymbols(model, element))
        .reduce((a, b) => a.concat(b));
  }
  return [];
}

/**
 * Enrich the model with recognized symbols
 * @param {Model} model Current model
 * @return {Model} Updated model
 */
function processRenderingResult(model) {
  const modelReference = model;
  logger.debug('Building the rendering model', modelReference);
  modelReference.recognizedSymbols = extractRecognizedSymbolsFromAnalyzerResult(model);
  return modelReference;
}

/**
 * Do the recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, model, recognizerContext) {
  const modelReference = model;
  const recognizerContextReference = recognizerContext;

  const data = buildInput(options, model, recognizerContextReference.analyzerInstanceId);
  updateSentRecognitionPositions(recognizerContextReference, modelReference);
  return NetworkInterface.post(`${options.recognitionParams.server.scheme}://${options.recognitionParams.server.host}/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json`, data)
      .then(
          // logResponseOnSuccess
          (response) => {
            logger.debug('Cdkv3RestAnalyzerRecognizer success', response);
            // memorizeInstanceId
            recognizerContextReference.analyzerInstanceId = response.instanceId;
            logger.debug('Cdkv3RestAnalyzerRecognizer update model', response);
            modelReference.rawResult = response;
            modelReference.rawResult.type = `${analyzerRestV3Configuration.type.toLowerCase()}Result`;
            return modelReference;
          }
      )
      .then(processRenderingResult)
      .then(InkModel.updateModelReceivedPosition);
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>}
 */
export function reset(options, model, recognizerContext) {
  resetRecognitionPositions(recognizerContext);
  // We are explicitly manipulating a reference here.
  // eslint-disable-next-line no-param-reassign
  delete recognizerContext.analyzerInstanceId;
  return Promise.resolve(model).then(InkModel.resetModelPositions);
}
