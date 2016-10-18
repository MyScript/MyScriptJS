import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import { extractSymbols as extractShapeSymbols } from '../common/Cdkv3CommonShapeRecognizer';
import cloneJSObject from '../../../util/Cloner';

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}

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
  model.rawRecognizedStrokes.forEach((stroke) => {
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
  const modelReference = modelParam;
  const currentRestAnalyzerRecognizer = this;

  const data = buildInput(paperOptions, modelParam, modelReference.recognitionContext.instanceId);

  // FIXME manage http mode
  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data)
      .then(
          // logResponseOnSuccess
          (response) => {
            logger.debug('Cdkv3RestAnalyzerRecognizer success', response);
          // memorizeInstanceId
            modelReference.recognitionContext.instanceId = response.instanceId;
            logger.debug('Cdkv3RestAnalyzerRecognizer update model', response);
            modelReference.rawResult = response;
            return modelReference;
          }
      )
      .then(
          // generateRenderingResult
          (modelFromParam) => {
            const mutatedModel = modelFromParam;
            const recognizedSymbols = [];

            // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
            const potentialStrokeList = modelReference.rawRecognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(modelReference));
            // TODO Check the wording compare to the SDK doc
            if (mutatedModel.rawResult.result) {
              // Handling text lines
              mutatedModel.rawResult.result.textLines.forEach((textLine) => {
                const mutatedTextLine = cloneJSObject(textLine);
                mutatedTextLine.type = 'textline';
                mutatedTextLine.inkRanges.forEach((inkRange) => {
                  potentialStrokeList[inkRange.stroke].toBeRemove = true;
                });
                // textLine.inkRanges = undefined;
                recognizedSymbols.push(textLine);
              });
              mutatedModel.rawResult.result.shapes.forEach((shape) => {
                Array.prototype.push.apply(recognizedSymbols, extractShapeSymbols(shape, potentialStrokeList));
              });
            }
            mutatedModel.recognizedSymbols = recognizedSymbols;
            logger.debug('Building the rendering model', mutatedModel);
            return mutatedModel;
          }
      );
}
