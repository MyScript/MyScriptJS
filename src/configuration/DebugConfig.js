import * as loggerConfig from './LoggerConfig';
import * as modelStats from '../util/ModelStats';

/**
 * Debug configuration
 * @typedef {Object} DebugConfiguration
 * @property {Object} loggerConfig Loggers configuration
 * @property {Stats} modelStats Statistics about current model
 */

/**
 * Debug configuration
 * @type {DebugConfiguration}
 */
export default { loggerConfig, modelStats };
