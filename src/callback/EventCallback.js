import { callbackLogger as logger } from '../configuration/LoggerConfig';

/**
 * Emits 'change' event when model change occurs
 * @param {Object} data
 * @param {String} type
 * @emits {Event} when the model changes.
 */
export default function eventCallback(data, type) {
  logger.debug(`emitting ${type} event`, data);
  // We are making usage of a browser provided class
  // eslint-disable-next-line no-undef
  this.dispatchEvent(new CustomEvent(type, { detail: data }));
}
