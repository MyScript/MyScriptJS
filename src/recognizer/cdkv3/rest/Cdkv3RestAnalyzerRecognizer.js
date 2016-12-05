import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import { extractSymbols as extractShapeSymbols } from '../common/Cdkv3CommonShapeRecognizer';

export { init, close } from '../../DefaultRecognizer';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param paperOptions
 * @param model
 * @param instanceId
 * @returns {{applicationKey: string}}
 * @private
 */
function buildInput(paperOptions, model, instanceId) {
  const input = {
    // Incremental
    components: [].concat(model.pendingStrokes).map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, { parameter: paperOptions.recognitionParams.analyzerParameter }); // Building the input with the suitable parameters

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId,
    applicationKey: paperOptions.recognitionParams.server.applicationKey,
    analyzerInput: JSON.stringify(input)
  };

  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.analyzerInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
  }
  return data;
}

function getStyleToApply(element, strokes) {
  // FIXME hack to apply the rendering param of the first element' stroke
  return {
    color: strokes[element.inkRanges[0].stroke].color,
    width: strokes[element.inkRanges[0].stroke].width
  };
}

function extractTextLine(element, strokes) {
  const symbols = [];
  const style = getStyleToApply(element, strokes);
  if (element.elementType === 'textLine') {
    // Create a simple textLine symbol to simplify rendering
    const textLineSymbol = {
      type: 'textLine',
      data: element.data,
      underlineList: element.underlineList
    };

    Object.assign(textLineSymbol, element.result.textSegmentResult.candidates[element.result.textSegmentResult.selectedCandidateIdx], style);
    symbols.push(textLineSymbol);
  }
  return symbols;
}

function extractTables(element, strokes) {
  const symbols = [];
  const style = getStyleToApply(element, strokes);
  if (element.elementType === 'table') {
    // Extract shape lines primitives
    if (element.lines && element.lines.length > 0) {
      element.lines.forEach((line) => {
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
  const potentialStrokeList = model.pendingStrokes.slice();
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
 * @param paperOptions
 * @param model
 * @param recognizerContext
 * @returns {Promise} Promise that return an updated model as a result
 */
export function recognize(paperOptions, model, recognizerContext) {
  const modelReference = model;
  const recognizerContextReference = recognizerContext;

  const data = buildInput(paperOptions, model, recognizerContextReference.analyzerInstanceId);

  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data)
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
 * @param paperOptions
 * @param model
 * @param recognizerContext
 * @returns {Promise}
 */
export function reset(paperOptions, model, recognizerContext) {
  // We are explicitly manipulating a reference here.
  // eslint-disable-next-line no-param-reassign
  delete recognizerContext.analyzerInstanceId;
  return Promise.resolve();
}

