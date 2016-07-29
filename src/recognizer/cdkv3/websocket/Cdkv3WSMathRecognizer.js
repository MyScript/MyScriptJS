'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('recognizer');
  var NetworkWSInterface = scope.NetworkWSInterface;
  var StrokeComponent = scope.StrokeComponent;

  function Cdkv3WSMathRecognizer() {

  }

  Cdkv3WSMathRecognizer.prototype.getAvailableRecognitionSlots = scope.Cdkv3CommonMathRecognizer.getAvailableRecognitionSlots;


  /**
   * Do the recogntion
   * @param paperOptionsParam
   * @param modelParam
   * @returns {Promise that return an updated model as a result}
   */
  Cdkv3WSMathRecognizer.prototype.recognize = function (paperOptionsParam, modelParam) {
    var paperOptions = paperOptionsParam;
    var model = modelParam;
    var currentWSMathRecognizer = this;
    var applicationKey = paperOptions.recognitonParams.server.applicationKey;
    var resolve;
    var reject;

    var promise = new Promise(
        function (resolveParam, rejectParam) {
          resolve = resolveParam;
          reject = rejectParam;
        });
    if (!currentWSMathRecognizer.resolveSet) {
      currentWSMathRecognizer.resolveSet = [];
    }
    currentWSMathRecognizer.resolveSet.push({promiseResolveFunction : resolve, promoiseRejectFunction :  reject, model : model});

    /*
     See http://doc.myscript.com/MyScriptCloud/3.1.0/myscript-cloud/protocols.html#websocket-protocol for a complete documentation
     The expected sequence is :
     - Client send applicationKey
     [If hmacKey enable]
     - Server answer with hmacChallenge
     - Client send hmc
     [Whatever the configuration is]
     - Server send init message
     [if no instanceId already set]
     - Client send start message
     - Server send mathResult with instanceId
     [If instanceId already set].
     - Client send continue message
     - Server send mathResult

     TODO

     */

    var buildInitInput = function () {
      return {
        type: 'applicationKey',
        applicationKey: paperOptions.recognitonParams.server.applicationKey
      };
    };


    var answerToHmacChallengeCallback = function (serverMessage) {
      return {
        "type": "hmac",
        "applicationKey": applicationKey,
        "challenge": serverMessage.data.challenge,
        "hmac": scope.CryptoHelper.computeHmac(serverMessage.data.challenge, paperOptions.recognitonParams.server.applicationKey, paperOptions.recognitonParams.server.hmacKey)
      };
    };

    var buildContinueInput = function () {
      var params = paperOptions.recognitonParams.mathParameter;

      var input = {
        "type": "continue",
        "components": []
      };
      //We add the pending strokes to the model
      scope.InkModel.extractNonRecognizedStrokes(model).forEach(function (stroke) {
        input.components.push(StrokeComponent.toJSON(stroke))
      });
      return input;
    }

    var buildStartInput = function () {
      var params = paperOptions.recognitonParams.mathParameter;

      var input = {
        "type": "start",
        "parameters": {
          resultTypes: params.resultTypes,
          isColumnar: params.isColumnar,
          userResources: params.userResources,
          scratchOutDetectionSensitivity: params.scratchOutDetectionSensitivity
        },
        "components": buildContinueInput().components
      };
      return input;
    }

    var simpleCallBack = function (payload, error) {
      logger.debug('payload', payload);
      logger.debug('error', error);
    };


    var websocketCallback = function (message) {
      logger.debug('Handling', message.type, message);
      switch (message.type) {
        case "open" :
          NetworkWSInterface.send(currentWSMathRecognizer.websocket, buildInitInput(paperOptions));
          break;
        case "message" :
          logger.debug('Functionnal message', message.data.type);
          switch (message.data.type) {
            case "hmacChallenge" :
              NetworkWSInterface.send(currentWSMathRecognizer.websocket, answerToHmacChallengeCallback(message));
              break;
            case "init" :
              NetworkWSInterface.send(currentWSMathRecognizer.websocket, buildStartInput());
              break;
            case "mathResult" :
              var callbackContext = currentWSMathRecognizer.resolveSet.pop();
              //Memorize instance id
              logger.debug("Cdkv3WSMathRecognizer memorizinf instance id", message.data.instanceId );
              currentWSMathRecognizer.instanceId = message.data.instanceId;
              //Update model
              logger.debug("Cdkv3WSMathRecognizer update model", message.data);
              callbackContext.model.rawResult = message.data;
              //Generate the rendering result
              var updateModel = scope.Cdkv3CommonMathRecognizer.generateRenderingResult(callbackContext.model)
              callbackContext.promiseResolveFunction(updateModel);
              break;
            default :
              simpleCallBack(message);
          }
          break;
        default :
          simpleCallBack(message);

      }


    }



    if (!currentWSMathRecognizer.instanceId || !currentWSMathRecognizer.websocket) {
      currentWSMathRecognizer.websocket = NetworkWSInterface.openWebSocket('ws://' + paperOptions.recognitonParams.server.host + '/api/v3.0/recognition/ws/math', websocketCallback);
    } else {
      NetworkWSInterface.send(currentWSMathRecognizer.websocket, buildContinueInput());
    }
    return promise;
  }


  // Export
  scope.Cdkv3WSMathRecognizer = Cdkv3WSMathRecognizer;
})(MyScript, logging);
