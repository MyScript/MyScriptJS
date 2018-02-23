/* eslint-disable no-underscore-dangle */
import * as NetworkInterface from '../networkInterface';
import * as RecognizerContext from '../../../model/RecognizerContext';
import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CdkCommonUtil from '../../common/CdkCommonUtil';

export { init, close, clear, reset } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const iinkRestConfiguration = {
  types: [Constants.RecognitionType.TEXT, Constants.RecognitionType.DIAGRAM, Constants.RecognitionType.MATH],
  protocol: Constants.Protocol.REST,
  apiVersion: 'V4',
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
  return iinkRestConfiguration;
}


/**
 * @param {String} suffixUrl
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @param {function(recognizerContext: RecognizerContext, model: Model): Object} buildMessage
 * @param {String} conversionState
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function postMessage(suffixUrl, recognizerContext, model, buildMessage, conversionState = '') {
  const configuration = recognizerContext.editor.configuration;
  return NetworkInterface.post(recognizerContext, `${configuration.recognitionParams.server.scheme}://${configuration.recognitionParams.server.host}${suffixUrl}`, buildMessage(recognizerContext, model, conversionState), 'V4').then((response) => {
    logger.debug('iinkRestRecognizer success', response);
    const positions = recognizerContext.lastPositions;
    positions.lastReceivedPosition = positions.lastSentPosition;
    const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, positions);
    if (response.instanceId) {
      recognizerContextReference.instanceId = response.instanceId;
    }
    return response;
  });
}

function buildTextConf(configuration) {
  return {
    text: configuration.recognitionParams.v4.text,
    lang: configuration.recognitionParams.v4.lang,
    export: configuration.recognitionParams.v4.export
  };
}

function buildMathConf(configuration) {
  return {
    math: configuration.recognitionParams.v4.math,
    lang: configuration.recognitionParams.v4.lang,
    export: configuration.recognitionParams.v4.export
  };
}

function buildDiagramConf(configuration) {
  return {
    diagram: configuration.recognitionParams.v4.diagram,
    lang: configuration.recognitionParams.v4.lang,
    export: configuration.recognitionParams.v4.export
  };
}

function buildData(recognizerContext, model, conversionState) {
  const configuration = recognizerContext.editor.configuration;
  let dataConf;

  if (configuration.recognitionParams.type === 'TEXT') {
    dataConf = buildTextConf(configuration);
  } else if (configuration.recognitionParams.type === 'MATH') {
    dataConf = buildMathConf(configuration);
  } else if (configuration.recognitionParams.type === 'DIAGRAM') {
    dataConf = buildDiagramConf(configuration);
  }

  const data = {
    configuration: dataConf,
    xDPI: 96,
    yDPI: 96,
    contentType: configuration.recognitionParams.type.charAt(0).toUpperCase() + configuration.recognitionParams.type.slice(1).toLowerCase(),
    height: recognizerContext.editor.domElement.clientHeight,
    width: recognizerContext.editor.domElement.clientWidth,
    writeEntries: [{
      strokes: model.rawStrokes.map(stroke => StrokeComponent.toJSONV4(stroke))
    }]
  };

  if (conversionState) {
    data.conversionState = 'DIGITAL_EDIT';
  }

  InkModel.updateModelSentPosition(model);
  return data;
}

function extractExports(configuration, res) {
  let exports;
  if (configuration.recognitionParams.type === 'TEXT' && configuration.recognitionParams.v4.text.mimeTypes[0] === 'text/plain') {
    exports = { text: res };
  } else if (configuration.recognitionParams.type === 'MATH' && configuration.recognitionParams.v4.math.mimeTypes[0] === 'application/x-latex') {
    exports = { latex: res };
  } else if (configuration.recognitionParams.type === 'MATH' && configuration.recognitionParams.v4.math.mimeTypes[0] === 'application/mathml+xml') {
    exports = { mathml: res };
  } else if (configuration.recognitionParams.type === 'MATH' && configuration.recognitionParams.v4.math.mimeTypes[0] === 'application/mathofficeXML') {
    exports = { mathofficeXML: res };
  } else if (configuration.recognitionParams.type === 'DIAGRAM' && configuration.recognitionParams.v4.diagram.mimeTypes[0] === 'image/svg+xml') {
    exports = { svg: res };
  } else if (configuration.recognitionParams.type === 'DIAGRAM' && configuration.recognitionParams.v4.diagram.mimeTypes[0] === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
    exports = { office: res };
  } else if (configuration.recognitionParams.type === 'DIAGRAM' && configuration.recognitionParams.v4.diagram.mimeTypes[0] === 'application/vnd.microsoft.art-gvml-clipformat') {
    exports = { clipformat: res };
  } else {
    exports = res;
  }
  return exports;
}

function resultCallback(model, configuration, res, callback) {
  logger.debug('iinkRestRecognizer result callback', model);
  const modelReference = InkModel.updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.exports = extractExports(configuration, res);
  logger.debug('iinkRestRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function export_(recognizerContext, model, callback) {
  const configuration = recognizerContext.editor.configuration;
  postMessage('/api/v4.0/iink/batch', recognizerContext, model, buildData, configuration.restConversionState)
    .then(res => resultCallback(model, configuration, res, callback))
    .catch(err => callback(err, model));
}

export function convert(recognizerContext, model, callback) {
  const configuration = recognizerContext.editor.configuration;
  postMessage('/api/v4.0/iink/batch', recognizerContext, model, buildData, 'DIGITAL_EDIT')
    .then(res => resultCallback(model, configuration, res, callback))
    .catch(err => callback(err, model));
}
