import { rendererLogger as logger } from '../../configuration/LoggerConfig';

export function drawTextPrimitive(component) {
  logger.debug('text rendering on');
  switch (component.type) {
    case 'inputCharacter':
      logger.info('inputCharacter are not yet render');
      break;
    case 'char':
      logger.info('char are not yet render');
      break;
    case 'string':
      logger.info('string are not yet render');
      break;
    default:
      break;
  }
}
