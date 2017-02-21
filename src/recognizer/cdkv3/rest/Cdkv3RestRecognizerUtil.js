import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as InkModel from '../../../model/InkModel';
import * as RecognizerContext from '../../../model/RecognizerContext';

/**
 * @param {String} suffixUrl
 * @param {Options} options
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param {function(options: Options, model: Model, recognizerContext: RecognizerContext): Object} buildInputFunction
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function postMessage(suffixUrl, options, model, recognizerContext, buildInputFunction) {
  const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, model);
  return NetworkInterface.post(`${options.recognitionParams.server.scheme}://${options.recognitionParams.server.host}${suffixUrl}`, buildInputFunction(options, model, recognizerContextReference))
      .then(
          (response) => {
            logger.debug('Cdkv3RestRecognizer success', response);
            const modelReference = InkModel.updateModelReceivedPosition(model);
            recognizerContextReference.instanceId = response.instanceId;
            modelReference.rawResults.recognition = response;
            logger.debug('Cdkv3RestRecognizer model updated', modelReference);
            return modelReference;
          }
      );
}
