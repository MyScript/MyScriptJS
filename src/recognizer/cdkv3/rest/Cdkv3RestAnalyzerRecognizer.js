import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as CryptoHelper from '../../CryptoHelper';
import { updateRecognitionPositions, resetRecognitionPositions } from '../../../model/RecognizerContext';
import { getAvailableRecognitionTriggers } from './Cdkv3CommonRestRecognizer'; // Configuring recognition trigger
import { extractSymbols as extractShapeSymbols } from '../common/Cdkv3CommonShapeRecognizer';

export { init, close } from '../../DefaultRecognizer';

/**
 * Get the configuration supported by this recognizer
 * @return {Configuration}
 */
export function getSupportedConfiguration() {
  return {
    type: MyScriptJSConstants.RecognitionType.ANALYZER,
    protocol: MyScriptJSConstants.Protocol.REST,
    apiVersion: 'V3',
    availableTriggers: getAvailableRecognitionTriggers(),
    preferredTrigger: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD
  };
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

function getStyleToApply(symbol, strokes) {
  // FIXME hack to apply the rendering param of the first element' stroke
  return {
    color: strokes[symbol.inkRanges[0].stroke].color,
    width: strokes[symbol.inkRanges[0].stroke].width
  };
}

function extractTextLine(symbol, strokes) {
  const symbols = [];
  const style = getStyleToApply(symbol, strokes);
  if (symbol.elementType === 'textLine') {
    // Create a simple textLine symbol to simplify rendering
    const textLineSymbol = {
      type: 'textLine',
      data: symbol.data,
      underlineList: symbol.underlineList
    };

    Object.assign(textLineSymbol, symbol.result.textSegmentResult.candidates[symbol.result.textSegmentResult.selectedCandidateIdx], style);
    symbols.push(textLineSymbol);
  }
  return symbols;
}

function extractTables(symbol, strokes) {
  const symbols = [];
  const style = getStyleToApply(symbol, strokes);
  if (symbol.elementType === 'table') {
    // Extract shape lines primitives
    if (symbol.lines && symbol.lines.length > 0) {
      symbol.lines.forEach((line) => {
        // Extract lines symbols
        const lineSymbol = {
          type: 'line',
          firstPoint: line.data.p1,
          lastPoint: line.data.p2
        };
        Object.assign(lineSymbol, style);
        symbols.push(lineSymbol);
      });
    }
  }
  return symbols;
}

function generatingRenderingResultCallback(model) {
  const modelReference = model;
  let recognizedSymbols = [];

  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialStrokeList = model.rawStrokes.slice();
  // TODO Check the wording compare to the SDK doc
  if (modelReference.rawResult.result) {
    modelReference.rawResult.result.tables.forEach((table) => {
      recognizedSymbols = recognizedSymbols.concat(extractTables(table, potentialStrokeList));
    });
    modelReference.rawResult.result.textLines.forEach((textLine) => {
      recognizedSymbols = recognizedSymbols.concat(extractTextLine(textLine, potentialStrokeList));
    });
    modelReference.rawResult.result.shapes.forEach((shape) => {
      recognizedSymbols = recognizedSymbols.concat(extractShapeSymbols(shape, potentialStrokeList));
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
  updateRecognitionPositions(recognizerContextReference, modelReference);
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
      .then(generatingRenderingResultCallback);
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
