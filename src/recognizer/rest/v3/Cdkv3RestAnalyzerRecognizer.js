/* eslint-disable no-underscore-dangle */
import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as Cdkv3RestRecognizerUtil from './Cdkv3RestRecognizerUtil';
import {
  extractShapeSymbols,
  getStyleFromInkRanges
} from '../../common/v3/Cdkv3CommonShapeRecognizer';

export { init, close, clear, reset } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const analyzerRestV3Configuration = {
  types: [Constants.RecognitionType.ANALYZER],
  protocol: Constants.Protocol.REST,
  apiVersion: 'V3',
  availableTriggers: {
    exportContent: [
      Constants.Trigger.QUIET_PERIOD,
      Constants.Trigger.DEMAND
    ]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return analyzerRestV3Configuration;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Object}
 */
function buildInput(recognizerContext, model) {
  const configuration = recognizerContext.editor.configuration;
  const input = {
    // Incremental
    components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, { parameter: configuration.recognitionParams.v3.analyzerParameter }); // Building the input with the suitable parameters

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    analyzerInput: JSON.stringify(input)
  };

  if (configuration.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.analyzerInput, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey);
  }
  InkModel.updateModelSentPosition(model);
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
  if (model.rawResults &&
      model.rawResults.exports &&
      model.rawResults.exports.result) {
    return [...model.rawResults.exports.result.shapes, ...model.rawResults.exports.result.tables, ...model.rawResults.exports.result.textLines]
      .map(element => extractSymbols(model, element))
      .reduce((a, b) => a.concat(b));
  }
  return [];
}

/**
 * Extract the exports
 * @param {Model} model Current model
 * @return {Object} exports
 */
function extractExports(model) {
  if (model.rawResults &&
    model.rawResults.exports &&
    model.rawResults.exports.result) {
    return {
      ANALYSIS: model.rawResults.exports.result
    };
  }
  return {};
}

function resultCallback(model, res, callback) {
  logger.debug('Cdkv3RestAnalyzerRecognizer result callback', model);
  const modelReference = InkModel.updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.recognizedSymbols = extractRecognizedSymbolsFromAnalyzerResult(model);
  modelReference.exports = extractExports(model);
  logger.debug('Cdkv3RestAnalyzerRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.CONVERTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function export_(recognizerContext, model, callback) {
  return Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', recognizerContext, model, buildInput)
    .then(res => resultCallback(model, res, callback))
    .catch(err => callback(err, model));
}
