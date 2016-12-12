import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

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

/**
 * Send data message
 * @param {WebSocket} websocket Current WebSocket
 * @param {Object} message Data message
 */
export function send(websocket, message) {
  const state = websocket.readyState;
  if (state === 1) {
    websocket.send(JSON.stringify(message));
  }
}

/**
 * @param {String} url URL
 * @param {function} callback Callback function to be notified of WebSocket changes
 * @return {WebSocket} Opened WebSocket
 */
export function openWebSocket(url, callback) {
  // eslint-disable-next-line no-undef
  const socket = new WebSocket(url);

  socket.onopen = (e) => {
    logger.debug('onOpen');
    callback(e);
  };

  socket.onclose = (e) => {
    logger.debug('onClose');
    callback(e);
  };

  socket.onerror = (e) => {
    logger.debug('onError');
    callback(e);
  };

  socket.onmessage = (e) => {
    logger.debug('onMessage');
    const callBackParam = {
      type: e.type,
      data: JSON.parse(e.data)
    };
    callback(callBackParam);
  };

  return socket;
}
