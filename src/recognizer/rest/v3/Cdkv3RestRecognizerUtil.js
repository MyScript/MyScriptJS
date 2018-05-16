import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkInterface from '../networkInterface';
import * as InkModel from '../../../model/InkModel';
import * as RecognizerContext from '../../../model/RecognizerContext';

/**
 * @param {String} suffixUrl
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @param {function(recognizerContext: RecognizerContext, model: Model): Object} buildMessage
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function postMessage(suffixUrl, recognizerContext, model, buildMessage) {
  const configuration = recognizerContext.editor.configuration;
  return NetworkInterface.post(recognizerContext, `${configuration.recognitionParams.server.scheme}://${configuration.recognitionParams.server.host}${suffixUrl}`, buildMessage(recognizerContext, model), 'V3')
    .then(
      (response) => {
        logger.debug('Cdkv3RestRecognizer success', response);
        const positions = recognizerContext.lastPositions;
        positions.lastReceivedPosition = positions.lastSentPosition;
        const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, positions);
        if (response.instanceId) {
          recognizerContextReference.instanceId = response.instanceId;
        }
        return response;
      }
    );
}
