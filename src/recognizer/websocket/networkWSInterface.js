import { recognizerLogger as logger } from '../../configuration/LoggerConfig';
import * as RecognizerContext from '../../model/RecognizerContext';


/**
 * Close the websocket
 * @param {WebSocket} websocket Current WebSocket
 * @param {Number} code Exit code
 * @param {String} reason Exit reason
 */
export function close(websocket, code, reason) {
  if (websocket && websocket.readyState < 2) {
    websocket.close(code, reason);
  }
}

function infinitPing(websocket) {
  const websocketRef = websocket;
  websocketRef.pingCount++;
  if (websocketRef.pingCount > websocketRef.maxPingLost) {
    websocket.close(1000, 'PING_LOST');
  } else if (websocketRef.readyState <= 1) {
    setTimeout(() => {
      if (websocketRef.readyState <= 1) {
        websocketRef.send(JSON.stringify({ type: 'ping' }));
        infinitPing(websocketRef);
      }
    }, websocketRef.pingIntervalMillis);
  }
}

/**
 * Attach all socket attributes helping managing server connexion
 * @param {WebSocket} websocket Current WebSocket
 * @param {RecognizerContext} recognizerContext
 */
function addWebsocketAttributes(websocket, recognizerContext) {
  const socket = websocket;
  socket.start = new Date();
  socket.autoReconnect = recognizerContext.configuration.recognitionParams.server.websocket.autoReconnect;
  socket.maxRetryCount = recognizerContext.configuration.recognitionParams.server.websocket.maxRetryCount;
  socket.pingPongActivated = recognizerContext.configuration.recognitionParams.server.websocket.pingPongActivated;
  socket.pingIntervalMillis = recognizerContext.configuration.recognitionParams.server.websocket.pingIntervalMillis;
  socket.maxPingLost = recognizerContext.configuration.recognitionParams.server.websocket.maxPingLostCount;
  socket.pingCount = 0;
  socket.recognizerContext = recognizerContext;
}

/**
 * @param {RecognizerContext} recognizerContext Recognizer context
 * @return {WebSocket} Opened WebSocket
 */
export function openWebSocket(recognizerContext) {
  let socket;
  try {
    // eslint-disable-next-line no-undef
    socket = new WebSocket(recognizerContext.url);
  } catch (error) {
    logger.error('Unable to open websocket, Check the host and your connectivity');
  }
  addWebsocketAttributes(socket, recognizerContext);
  if (recognizerContext.configuration.recognitionParams.server.websocket.pingPongActivated) {
    infinitPing(socket);
  }

  socket.onopen = (e) => {
    logger.debug('onOpen');
    recognizerContext.callback(e);
  };

  socket.onclose = (e) => {
    logger.debug('onClose', new Date() - socket.start);
    recognizerContext.callback(e);
  };

  socket.onerror = (e) => {
    logger.debug('onError');
    recognizerContext.callback(e);
  };

  socket.onmessage = (e) => {
    logger.debug('onMessage');
    socket.pingCount = 0;
    const parsedMessage = JSON.parse(e.data);
    if (parsedMessage.type !== 'pong') {
      const callBackParam = {
        type: e.type,
        data: JSON.parse(e.data)
      };
      recognizerContext.callback(callBackParam);
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
    logger.debug(`Send ${message.type} message`);
    websocket.send(JSON.stringify(message));
  } else {
    throw RecognizerContext.LOST_CONNEXION_MESSAGE;
  }
}
