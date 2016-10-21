import { default as ReconnectingWebsocket } from 'reconnecting-websocket';
import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

export function isClosed(websocket) {
  return websocket.readyState === 3;
}

export function isClosing(websocket) {
  return websocket.readyState === 2;
}

export function isOpen(websocket) {
  return websocket.readyState === 1;
}

export function isConnecting(websocket) {
  return websocket.readyState === 0;
}

export function close(websocket, code, reason) {
  if (websocket.readyState < 2) {
    websocket.close(code, reason);
  }
}

export function send(websocket, message) {
  const state = websocket.readyState;
  if (state === 1) {
    websocket.send(JSON.stringify(message));
  }
}

/**
 *
 * @param url
 * @param callback
 * @returns {WebSocket}
 * @private
 */
export function openWebSocket(url, callback) {
  function onOpen(e) {
    logger.debug('onOpen');
    callback(e);
  }

  function onClose(e) {
    logger.debug('onClose');
    callback(e);
  }

  function onError(e) {
    logger.debug('onError');
    callback(e);
  }

  function onMessage(e) {
    logger.debug('onMessage');
    const callBackParam = {
      type: e.type,
      data: JSON.parse(e.data)
    };
    callback(callBackParam);
  }

  const socket = new WebSocket(url);
  socket.onopen = onOpen;
  socket.onclose = onClose;
  socket.onerror = onError;
  socket.onmessage = onMessage;
  return socket;
}

/**
 *
 * @param socket
 * @param message
 * @private
 */
export function sendMessage(socket, message) {
  if (socket) {
    socket.send(JSON.stringify(message));
  }
}

