/* eslint-disable no-underscore-dangle */
import * as NetworkInterface from '../networkInterface';
import * as RecognizerContext from '../../../model/RecognizerContext';
import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as DefaultTheme from '../../../configuration/DefaultTheme';
import * as DefaultPenStyle from '../../../configuration/DefaultPenStyle';

export { init, close, clear, reset } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const iinkRestConfiguration = {
  types: [Constants.RecognitionType.TEXT, Constants.RecognitionType.DIAGRAM, Constants.RecognitionType.MATH, Constants.RecognitionType.RAWCONTENT],
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
 * @param {function(recognizerContext: RecognizerContext, model: Model, conversionState: String): Object} buildMessage
 * @param {String} conversionState
 * @param {String} mimeType
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function postMessage(suffixUrl, recognizerContext, model, buildMessage, conversionState = '', mimeType) {
  const configuration = recognizerContext.editor.configuration;
  return NetworkInterface.post(recognizerContext, `${configuration.recognitionParams.server.scheme}://${configuration.recognitionParams.server.host}${suffixUrl}`, buildMessage(recognizerContext, model, conversionState), 'V4', mimeType).then((response) => {
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

function buildRawContentConf(configuration) {
  return {
    'raw-content': {
      recognition: configuration.recognitionParams.v4['raw-content'].recognition
    },
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
  } else if (configuration.recognitionParams.type === 'Raw Content') {
    dataConf = buildRawContentConf(configuration);
  }

  const newStrokes = [];
  model.strokeGroups.forEach((group) => {
    const newPenStyle = JSON.stringify(group.penStyle) === '{}' ? null : DefaultPenStyle.toCSS(group.penStyle);
    const newGroup = {
      penStyle: newPenStyle,
      strokes: group.strokes.map(stroke => StrokeComponent.toJSONV4(stroke))
    };
    newStrokes.push(newGroup);
  });

  const contentType = configuration.recognitionParams.type === 'Raw Content' ? 'Raw Content' : configuration.recognitionParams.type.charAt(0).toUpperCase() + configuration.recognitionParams.type.slice(1).toLowerCase();

  const data = {
    configuration: dataConf,
    xDPI: 96,
    yDPI: 96,
    contentType,
    height: recognizerContext.editor.domElement.clientHeight,
    width: recognizerContext.editor.domElement.clientWidth,
    theme: DefaultTheme.toCSS(recognizerContext.editor.theme),
    strokeGroups: newStrokes
  };

  if (conversionState) {
    data.conversionState = 'DIGITAL_EDIT';
  }

  InkModel.updateModelSentPosition(model);
  return data;
}

function extractExports(configuration, mimeType, res) {
  const exports = {};
  if (mimeType === 'application/vnd.myscript.jiix') {
    exports['application/vnd.myscript.jiix'] = res;
  }
  if (configuration.recognitionParams.type === 'TEXT' && mimeType === 'text/plain') {
    exports['text/plain'] = res;
  } else if (configuration.recognitionParams.type === 'DIAGRAM') {
    if (mimeType === 'image/svg+xml') {
      exports['image/svg+xml'] = res;
    }
    if (mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      exports['application/vnd.openxmlformats-officedocument.presentationml.presentation'] = res;
    }
    if (mimeType === 'application/vnd.microsoft.art-gvml-clipformat') {
      exports['application/vnd.microsoft.art-gvml-clipformat'] = res;
    }
  } else if (configuration.recognitionParams.type === 'MATH') {
    if (mimeType === 'application/x-latex') {
      exports['application/x-latex'] = res;
    }
    if (mimeType === 'application/mathml+xml') {
      exports['application/mathml+xml'] = res;
    }
    if (mimeType === 'application/mathofficeXML') {
      exports['application/mathofficeXML'] = res;
    }
  }
  return exports;
}

function resultCallback(model, configuration, res, mimeType, callback) {
  logger.debug('iinkRestRecognizer result callback', model);
  const modelReference = InkModel.updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  if (modelReference.exports) {
    Object.assign(modelReference.exports, extractExports(configuration, mimeType, res));
  } else {
    modelReference.exports = extractExports(configuration, mimeType, res);
  }
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

  function callPostMessage(mimeType) {
    postMessage('/api/v4.0/iink/batch', recognizerContext, model, buildData, configuration.restConversionState, mimeType)
      .then(res => resultCallback(model, configuration, res, mimeType, callback))
      .catch(err => callback(err, model));
  }

  if (configuration.recognitionParams.type === 'TEXT') {
    configuration.recognitionParams.v4.text.mimeTypes.forEach((mimeType) => {
      callPostMessage(mimeType);
    });
  } else if (configuration.recognitionParams.type === 'DIAGRAM') {
    configuration.recognitionParams.v4.diagram.mimeTypes.forEach((mimeType) => {
      callPostMessage(mimeType);
    });
  } else if (configuration.recognitionParams.type === 'MATH') {
    configuration.recognitionParams.v4.math.mimeTypes.forEach((mimeType) => {
      callPostMessage(mimeType);
    });
  } else if (configuration.recognitionParams.type === 'Raw Content') {
    configuration.recognitionParams.v4['raw-content'].mimeTypes.forEach((mimeType) => {
      callPostMessage(mimeType);
    });
  }
}

/**
 * Ask for conversion using DIGITAL_EDIT
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function convert(recognizerContext, model, callback) {
  const configuration = recognizerContext.editor.configuration;
  postMessage('/api/v4.0/iink/batch', recognizerContext, model, buildData, 'DIGITAL_EDIT')
    .then(res => resultCallback(model, configuration, res, callback))
    .catch(err => callback(err, model));
}
