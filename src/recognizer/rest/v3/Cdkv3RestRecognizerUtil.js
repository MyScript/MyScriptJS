import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkInterface from '../networkInterface';
import * as InkModel from '../../../model/InkModel';
import * as RecognizerContext from '../../../model/RecognizerContext';

/**
 * @param {String} suffixUrl
 * @param {Configuration} configuration
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext): Object} buildInputFunction
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function postMessage(suffixUrl, configuration, model, recognizerContext, buildInputFunction) {
  return NetworkInterface.post(`${configuration.recognitionParams.server.scheme}://${configuration.recognitionParams.server.host}${suffixUrl}`, buildInputFunction(configuration, model, recognizerContext))
      .then(
          (response) => {
            logger.debug('Cdkv3RestRecognizer success', response);
            const modelReference = InkModel.updateModelReceivedPosition(model);
            const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, model);
            if (response.instanceId) {
              recognizerContextReference.instanceId = response.instanceId;
            }
            modelReference.rawResults.exports = response;
            logger.debug('Cdkv3RestRecognizer model updated', modelReference);
            return modelReference;
          }
      );
}
