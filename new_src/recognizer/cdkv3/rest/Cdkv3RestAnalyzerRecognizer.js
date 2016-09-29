import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import cloneJSObject from '../../../util/Cloner';

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}

/**
 * Internal fonction to build the payload to ask for a recogntion.
 * @param paperOptions
 * @param model
 * @returns {{applicationKey: string}}
 * @private
 */
function buildInput(paperOptions, model, analyzerInstanceId) {
  const data = {
    applicationKey: paperOptions.recognitonParams.server.applicationKey,
    instanceId: analyzerInstanceId
    // "instanceId": null,
  };


  const analyzerInput = {
    parameter: {
      //FIXME Manage the various parameters
      textParameter: {
        textProperties: {},
        language: 'en_US',
        textInputMode: 'CURSIVE'
      }
    },
    components: []
  };


  // As Rest Text recogntion is non incremental wa add the already recognized strokes
  model.recognizedStrokes.forEach((stroke) => {
    analyzerInput.components.push(StrokeComponent.toJSON(stroke));
  });

  //We add the pending strokes to the model
  InkModel.extractNonRecognizedStrokes(model).forEach((stroke) => {
    analyzerInput.components.push(StrokeComponent.toJSON(stroke));
  });

  data.analyzerInput = JSON.stringify(analyzerInput);
  if (paperOptions.recognitonParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.analyzerInput, paperOptions.recognitonParams.server.applicationKey, paperOptions.recognitonParams.server.hmacKey);
  }
  return data;

}

/**
 * Do the recogntion
 * @param paperOptionsParam
 * @param modelParam
 * @returns {Promise that return an updated model as a result}
 */
export function recognize(paperOptionsParam, modelParam) {
  const paperOptions = paperOptionsParam;
  const model = modelParam;
  const currentRestAnalyzerRecognizer = this;

  const data = buildInput(paperOptions, modelParam, currentRestAnalyzerRecognizer.analyzerInstanceId);

  //FIXME manage http mode
  return NetworkInterface.post('https://' + paperOptions.recognitonParams.server.host + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data).then(
      //logResponseOnSucess
      (response) => {
        logger.debug('Cdkv3RestAnalyzerRecognizer success', response);
        return response;
      }
  ).then(
      //memorizeInstanceId
      (response) => {
        currentRestAnalyzerRecognizer.analyzerInstanceId = response.instanceId;
        return response;
      }
  ).then(
      //updateModel
      (response) => {
        logger.debug('Cdkv3RestAnalyzerRecognizer update model', response);
        model.rawResult = response;
        return model;
      }
  ).then(
      //generateRenderingResult
      (modelPromParam) => {
        const mutatedModel = InkModel.clone(modelPromParam);
        const recognizedComponents = {
          segmentList: [],
          symbolList: [],
          inkRange: {}
        };
        //We recopy the recognized strokes to flag them as toBeRemove if they are scratchouted or map with a symbol
        const potentialSegmentList = model.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(model));
        //TODO Check the wording compare to the SDK doc
        if (mutatedModel.rawResult.result) {
          //Handling text lines
          mutatedModel.rawResult.result.textLines.forEach((textLine) => {
            const mutatedTextLine = cloneJSObject(textLine);
            mutatedTextLine.type = 'textline';
            mutatedTextLine.inkRanges.forEach((inkRange) => {
              potentialSegmentList[inkRange.stroke].toBeRemove = true;
            });
            //textLine.inkRanges = undefined;
            recognizedComponents.symbolList.push(textLine);
          });

          mutatedModel.rawResult.result.shapes.forEach((shape) => {
            if (shape.candidates && shape.candidates.length > 0 && shape.candidates[0].type !== 'notRecognized') {
              //Flagging strokes recognized as toBeRemove
              shape.inkRanges.forEach((inkRange) => {
                potentialSegmentList.slice(inkRange.firstStroke, inkRange.lastStroke + 1).forEach((segment) => {
                  segment.toBeRemove = true;
                });
              });
              //Merging the first candidate with the shape element
              const newSymbol = Object.assign(shape, shape.candidates[0]);
              newSymbol.candidates = undefined;
              recognizedComponents.symbolList.push(newSymbol);
            }
          });
        }
        recognizedComponents.segmentList = potentialSegmentList.filter(segment => !segment.toBeRemove);
        recognizedComponents.inkRange.firstStroke = 0;
        recognizedComponents.inkRange.lastStroke = model.recognizedStrokes.length;
        mutatedModel.recognizedComponents = recognizedComponents;
        logger.debug('Building the rendering model', mutatedModel);
        return mutatedModel;
      }
  );
}
