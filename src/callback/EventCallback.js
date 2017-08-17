import { callbackLogger as logger } from '../configuration/LoggerConfig';

/**
 * Emits an event when the editor state change
 * @param {String} type
 * @param {Object} data
 * @emits {Event}
 */
export default function eventCallback(type, data) {
  logger.info(`emitting ${type} event`, data);
  // We are making usage of a browser provided class
  // eslint-disable-next-line no-undef
  this.dispatchEvent(new CustomEvent(type, data ? { detail: data } : undefined));
}
