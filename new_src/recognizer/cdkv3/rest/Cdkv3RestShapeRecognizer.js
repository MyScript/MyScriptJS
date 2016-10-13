import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as Cdkv3CommonMathRecognizer from '../common/Cdkv3CommonMathRecognizer';


export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}

export function getType() {
  return MyScriptJSConstants.RecognitionType.SHAPE;
}

export function getProtocol() {
  return MyScriptJSConstants.Protocol.REST;
}


/**
 * Internal fonction to build the payload to ask for a recogntion.
 * @param paperOptions
 * @param model
 * @param shapeInstanceId
 * @returns {{applicationKey: string}}
 * @private
 */
function buildInput(paperOptions, model, shapeInstanceId) {
  // Building the input with the suitable parameters
  const params = paperOptions.recognitonParams.shapeParameter;
  const input = {
    rejectDetectionSensitivity: params.rejectDetectionSensitivity,
    doBeautification: params.doBeautification,
    userResources: params.userResources,
    components: []
  };

  // We add the pending strokes to the model
  InkModel.extractNonRecognizedStrokes(model).forEach((stroke) => {
    input.components.push(StrokeComponent.toJSON(stroke));
  });

  const data = {
    shapeInput: JSON.stringify(input),
    applicationKey: paperOptions.recognitonParams.server.applicationKey,
    instanceId: shapeInstanceId
  };

  if (paperOptions.recognitonParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.shapeInput, paperOptions.recognitonParams.server.applicationKey, paperOptions.recognitonParams.server.hmacKey);
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
  const currentRestShapeRecognizer = this;

  const data = buildInput(paperOptions, modelParam, currentRestShapeRecognizer.shapeInstanceId);

  // FIXME manage http mode
  return NetworkInterface.post(paperOptions.recognitonParams.server.scheme + '://' + paperOptions.recognitonParams.server.host + '/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', data)
      .then(
          // logResponseOnSucess
          (response) => {
            logger.debug('Cdkv3RestShapeRecognizer success', response);
            return response;
          }
      )
      .then(
          // memorizeInstanceId
          (response) => {
            currentRestShapeRecognizer.shapeInstanceId = response.instanceId;
            return response;
          }
      )
      .then(
          // updateModel
          (response) => {
            logger.debug('Cdkv3RestShapeRecognizer update model', response);
            model.rawResult = response;
            return model;
          }
      )
      .then(
          // generateRenderingResult
          (updatedModel) => {
            const recognizedComponents = {
              segmentList: [],
              symbolList: [],
              inkRange: {}
            };
            // We recopy the recognized strokes to flag them as toBeRemove if they are scratchouted or map with a symbol
            const potentialSegmentList = model.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(updatedModel));
            // TODO Check the wording compare to the SDK doc
            if (updatedModel.rawResult.result) {
              updatedModel.rawResult.result.segments.forEach((shape) => {
                if (shape.candidates && shape.candidates.length > 0 && shape.candidates[0].type !== 'notRecognized') {
                  // Flagging strokes recognized as toBeRemove
                  shape.inkRanges.forEach((inkRange) => {
                    potentialSegmentList.slice(inkRange.firstStroke, inkRange.lastStroke + 1)
                        .forEach((segment) => {
                          segment.toBeRemove = true;
                        });
                  });
                  // Merging the first candidate with the shape element
                  const newSymbol = Object.assign(shape, shape.candidates[0]);
                  newSymbol.candidates = undefined;
                  recognizedComponents.symbolList.push(newSymbol);
                }
              });
            }
            recognizedComponents.segmentList = potentialSegmentList.filter(segment => !segment.toBeRemove);
            recognizedComponents.inkRange.firstStroke = 0;
            recognizedComponents.inkRange.lastStroke = updatedModel.recognizedStrokes.length;
            updatedModel.recognizedComponents = recognizedComponents;
            logger.debug('Building the rendering model', updatedModel);
            return model;
          }
      );
}
