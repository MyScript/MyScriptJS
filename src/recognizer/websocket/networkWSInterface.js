import { recognizerLogger as logger } from '../../configuration/LoggerConfig';
import * as RecognizerContext from '../../model/RecognizerContext';

function infinitePing(websocket) {
  const websocketRef = websocket;
  websocketRef.pingLostCount++;
  if (websocketRef.pingLostCount > websocketRef.maxPingLost) {
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
 * @param {RecognizerContext} recognizerContext
 */
function addWebsocketAttributes(websocket, recognizerContext) {
  const websocketConfiguration = recognizerContext.editor.configuration.recognitionParams.server.websocket;
  const socket = websocket;
  socket.start = new Date();
  socket.autoReconnect = websocketConfiguration.autoReconnect;
  socket.maxRetryCount = websocketConfiguration.maxRetryCount;
  socket.pingEnabled = websocketConfiguration.pingEnabled;
  socket.pingDelay = websocketConfiguration.pingDelay;
  socket.maxPingLost = websocketConfiguration.maxPingLostCount;
  socket.pingLostCount = 0;
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
  if (socket.pingEnabled) {
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
    socket.pingLostCount = 0;
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
  const recognizerContextRef = recognizerContext;
  recognizerContextRef.idle = false;

  const websocket = recognizerContextRef.websocket;
  if (websocket.readyState <= 1) {
    websocket.send(JSON.stringify(message));
    logger.debug(`${message.type} message sent`, message);
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
    websocket.close(code, reason);
  }
}
