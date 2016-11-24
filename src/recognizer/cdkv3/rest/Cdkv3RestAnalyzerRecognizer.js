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

export function getDefaultSymbols(paperOptions) {
  return [];
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
    parameter: paperOptions.analyzerParameter,
    components: []
  };

  // We add the pending strokes to the model
  InkModel.extractAllPendingStrokesAsJsonArray(model).forEach((stroke) => {
    analyzerInput.components.push(StrokeComponent.toJSON(stroke));
  });

  data.analyzerInput = JSON.stringify(analyzerInput);
  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.analyzerInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
  }
  return data;
}

function getStyleToApply(element, strokes) {
  // FIXME hack to apply the rendering param of the first element' stroke
  const style = {
    color: strokes[element.inkRanges[0].stroke].color,
    width: strokes[element.inkRanges[0].stroke].width
  };
  return style;
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

function generatingRenderingResultCallback(modelFromParam) {
  const mutatedModel = modelFromParam;
  let recognizedSymbols = [];

  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialStrokeList = mutatedModel.rawRecognizedStrokes.concat(InkModel.extractPendingStrokes(mutatedModel));
  // TODO Check the wording compare to the SDK doc
  if (mutatedModel.rawResult.result) {
    mutatedModel.rawResult.result.tables.forEach((table) => {
      recognizedSymbols = recognizedSymbols.concat(extractTables(table, potentialStrokeList));
    });
    mutatedModel.rawResult.result.textLines.forEach((textLine) => {
      recognizedSymbols = recognizedSymbols.concat(extractTextLine(textLine, potentialStrokeList));
    });
    mutatedModel.rawResult.result.shapes.forEach((shape) => {
      recognizedSymbols = recognizedSymbols.concat(extractShapeSymbols(shape, potentialStrokeList));
    });
  }
  mutatedModel.recognizedSymbols = recognizedSymbols;
  logger.debug('Building the rendering model', mutatedModel);
  return mutatedModel;
}

/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @param recognizerContext
 * @returns {Promise} Promise that return an updated model as a result
 */
export function recognize(paperOptionsParam, modelParam, recognizerContext) {
  const paperOptions = paperOptionsParam;
  const modelReference = modelParam;
  const recognizerContextReference = recognizerContext;
  const data = buildInput(paperOptions, modelParam, recognizerContextReference.analyzerInstanceId);
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
 * @param paperOptionsParam
 * @param modelParam
 * @param recognizerContext
 * @returns {Promise}
 */
export function reset(paperOptionsParam, modelParam, recognizerContext) {
  // We are explicitly manipulating a reference here.
  // eslint-disable-next-line no-param-reassign
  delete recognizerContext.analyzerInstanceId;
  return Promise.resolve();
}

