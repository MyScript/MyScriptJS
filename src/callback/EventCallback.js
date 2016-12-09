import { inkpaperLogger as logger } from '../configuration/LoggerConfig';

/**
 * Emits 'change' event when model change occurs
 * @param {Model} data The current model data that have changed.
 * @emits {Event} when the model changes.
 */
export default function eventCallback(data) {
  logger.debug('emitting change event', data);
  // We are making usage of a browser provided class
  // eslint-disable-next-line no-undef
  this.dispatchEvent(new CustomEvent('change', { detail: data }));
}
