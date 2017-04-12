import { recognizerLogger as logger } from '../../configuration/LoggerConfig';
import * as RecognizerContext from '../../model/RecognizerContext';

function infinitePing(websocket) {
  const websocketRef = websocket;
  websocketRef.pingCount++;
  if (websocketRef.pingCount > websocketRef.maxPingLost) {
    websocket.close(1000, 'PING_LOST');
  } else if (websocketRef.readyState <= 1) {
    setTimeout(() => {
      if (websocketRef.readyState <= 1) {
        websocketRef.send(JSON.stringify({ type: 'ping' }));
        infinitePing(websocketRef);
      }
    }, websocketRef.pingDelay);
  }
}

/**
 * Attach all socket attributes helping managing server connexion
 * @param {WebSocket} websocket Current WebSocket
 * @param {Configuration} configuration Current configuration
 * @param {RecognizerContext} recognizerContext
 */
function addWebsocketAttributes(websocket, configuration, recognizerContext) {
  const socket = websocket;
  socket.start = new Date();
  socket.autoReconnect = configuration.recognitionParams.server.websocket.autoReconnect;
  socket.maxRetryCount = configuration.recognitionParams.server.websocket.maxRetryCount;
  socket.pingEnabled = configuration.recognitionParams.server.websocket.pingEnabled;
  socket.pingDelay = configuration.recognitionParams.server.websocket.pingDelay;
  socket.maxPingLost = configuration.recognitionParams.server.websocket.maxPingLostCount;
  socket.pingCount = 0;
  socket.recognizerContext = recognizerContext;
}

/**
 * @param {Configuration} configuration Current configuration
 * @param {RecognizerContext} recognizerContext Recognizer context
 * @return {WebSocket} Opened WebSocket
 */
export function openWebSocket(configuration, recognizerContext) {
  let socket;
  try {
    // eslint-disable-next-line no-undef
    socket = new WebSocket(recognizerContext.url);
  } catch (error) {
    logger.error('Unable to open websocket, Check the host and your connectivity');
  }
  addWebsocketAttributes(socket, configuration, recognizerContext);
  if (configuration.recognitionParams.server.websocket.pingEnabled) {
    infinitePing(socket);
  }

  socket.onopen = (e) => {
    logger.trace('onOpen');
    recognizerContext.websocketCallback(e);
  };

  socket.onclose = (e) => {
    logger.trace('onClose', new Date() - socket.start);
    recognizerContext.websocketCallback(e);
  };

  socket.onerror = (e) => {
    logger.trace('onError');
    recognizerContext.websocketCallback(e);
  };

  socket.onmessage = (e) => {
    logger.trace('onMessage');
    socket.pingCount = 0;
    const parsedMessage = JSON.parse(e.data);
    if (parsedMessage.type !== 'pong') {
      const callBackParam = {
        type: e.type,
        data: JSON.parse(e.data)
      };
      recognizerContext.websocketCallback(callBackParam);
    }
  };

  return socket;
}

/**
 * Send data message
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Object} message Data message
 */
export function send(recognizerContext, message) {
  const websocket = recognizerContext.websocket;
  const state = websocket.readyState;
  if (state <= 1) {
    logger.debug(`send ${message.type} message`, message);
    websocket.send(JSON.stringify(message));
  } else {
    throw RecognizerContext.LOST_CONNEXION_MESSAGE;
  }
}

/**
 * Close the websocket
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Number} code Exit code
 * @param {String} reason Exit reason
 */
export function close(recognizerContext, code, reason) {
  const websocket = recognizerContext.websocket;
  if (websocket && websocket.readyState < 2) {
    websocket.autoReconnect = false;
    websocket.close(code, reason);
  }
}
