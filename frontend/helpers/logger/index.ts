import { levels } from "./levels";
import { constants } from "../";
import warnBestPractices from "./warn-best-practices";

/**
 * @description
 * logging with different levels based on logger variable set in environment variables \
 * checkout logger/levels.ts in helpers for modifying or defining custom levels
 * @example
 * // logging an error
 * log.error({prefix:"Bad auth : ",message:{error:"session expired"}})
 *
 * // logging a warning
 * log.warn({prefix:"Sign In : ",message:{error:"max tries reached"}})
 */
let log = levels;

const logger = constants.logger;
// Disable all log functions when logger set to false in environment variables
if (!logger) {
  log = {
    error: () => {},
    info: () => {},
    notice: () => {},
    silly: () => {},
    verbose: () => {},
    warn: () => {},
  };
}

export { log, levels, warnBestPractices };
