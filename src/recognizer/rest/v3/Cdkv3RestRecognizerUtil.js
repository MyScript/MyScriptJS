import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkInterface from '../networkInterface';
import * as InkModel from '../../../model/InkModel';
import * as RecognizerContext from '../../../model/RecognizerContext';

/**
 * @param {String} suffixUrl
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @param {function(recognizerContext: RecognizerContext, model: Model): Object} buildInputFunction
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function postMessage(suffixUrl, recognizerContext, model, buildInputFunction) {
  const configuration = recognizerContext.getConfiguration();
  return NetworkInterface.post(`${configuration.recognitionParams.server.scheme}://${configuration.recognitionParams.server.host}${suffixUrl}`, buildInputFunction(recognizerContext, model))
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
