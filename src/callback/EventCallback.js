import { inkpaperLogger as logger } from '../configuration/LoggerConfig';

export default function (domElement, data, eventName = 'change') {
  logger.debug(`emitting ${eventName} event`, data);
  // eslint-disable-next-line no-undef
  domElement.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  return data;
}
