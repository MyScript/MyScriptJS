import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as CryptoHelper from '../../CryptoHelper';
import { updateSentRecognitionPositions, resetRecognitionPositions } from '../../../model/RecognizerContext';
import { commonRestV3Configuration, updateModelReceivedPosition } from './Cdkv3CommonRestRecognizer'; // Configuring recognition trigger
import { extractSymbols as extractShapeSymbols } from '../common/Cdkv3CommonShapeRecognizer';

export { init, close } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {{type: String, protocol: String, apiVersion: String}}
 */
export const analyzerRestV3Configuration = {
  type: MyScriptJSConstants.RecognitionType.ANALYZER,
  protocol: MyScriptJSConstants.Protocol.REST,
  apiVersion: 'V3'
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return Object.assign({}, commonRestV3Configuration, analyzerRestV3Configuration);
}

function buildInput(options, model, instanceId) {
  const input = {
    // Incremental
    components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, { parameter: options.recognitionParams.analyzerParameter }); // Building the input with the suitable parameters

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

function getStyleToApply(model, symbol) {
  // FIXME hack to apply the rendering param of the first element' stroke
  const stroke = StrokeComponent.slice(model.rawStrokes[symbol.inkRanges[0].stroke], symbol.inkRanges[0].firstPoint, symbol.inkRanges[0].lastPoint + 1);
  const style = {
    color: stroke.color,
    width: stroke.width
  };
  Object.assign(symbol, style);
  return style;
}

/**
 * Extract text lines
 * @param {Model} model
 * @param {Object} symbol
 * @return {Array<Object>}
 */
function extractTextLine(model, symbol) {
  const symbols = [];
  const style = getStyleToApply(model, symbol);
  if (symbol.elementType === 'textLine') {
    Object.assign(symbol, symbol.result.textSegmentResult.candidates[symbol.result.textSegmentResult.selectedCandidateIdx], style);
    symbols.push(symbol);
  }
  return symbols;
}

/**
 * Extract tables
 * @param {Model} model
 * @param {Object} symbol
 * @return {Array<Object>}
 */
function extractTables(model, symbol) {
  const symbols = [];
  const style = getStyleToApply(model, symbol);
  if (symbol.elementType === 'table') {
    // Extract shape lines primitives
    if (symbol.lines && symbol.lines.length > 0) {
      symbol.lines.forEach((line) => {
        Object.assign(line, style);
        symbols.push(line);
      });
    }
  }
  return symbols;
}

/**
 * Enrich the model with recognized symbols
 * @param {Model} model Current model
 * @return {Model} Updated model
 */
function processRenderingResult(model) {
  const modelReference = model;
  let recognizedSymbols = [];

  // TODO Check the wording compare to the SDK doc
  if (modelReference.rawResult.result) {
    modelReference.rawResult.result.tables.forEach((table) => {
      recognizedSymbols = recognizedSymbols.concat(extractTables(model, table));
    });
    modelReference.rawResult.result.textLines.forEach((textLine) => {
      recognizedSymbols = recognizedSymbols.concat(extractTextLine(model, textLine));
    });
    modelReference.rawResult.result.shapes.forEach((shape) => {
      recognizedSymbols = recognizedSymbols.concat(extractShapeSymbols(model, shape));
    });
  }
  modelReference.recognizedSymbols = recognizedSymbols;
  logger.debug('Building the rendering model', modelReference);
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
            return modelReference;
          }
      )
      .then(processRenderingResult)
      .then(updateModelReceivedPosition);
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise}
 */
export function reset(options, model, recognizerContext) {
  resetRecognitionPositions(recognizerContext, model);
  // We are explicitly manipulating a reference here.
  // eslint-disable-next-line no-param-reassign
  delete recognizerContext.analyzerInstanceId;
  return Promise.resolve();
}
