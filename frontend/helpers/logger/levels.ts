import logger from "npmlog";
import { warnBestPractices } from ".";

// This file decouples logging library from application,
// enabling to use different libraries
// without changing code at other places in application

const warnFunctionFromLibrary = logger.warn;

type IloggingLevels = ["silly", "verbose", "info", "notice", "warn", "error"];
const loggingLevels: IloggingLevels = [
  "silly",
  "verbose",
  "info",
  "notice",
  "warn",
  "error",
];

type ILoggingFunction = (params: { prefix?: string; message: any }) => void;
const levels: {
  silly: ILoggingFunction;
  verbose: ILoggingFunction;
  info: ILoggingFunction;
  notice: ILoggingFunction;
  warn: ILoggingFunction;
  error: ILoggingFunction;
} = {
  silly(params) {},
  verbose(params) {},
  info(params) {},
  notice(params) {},
  warn(params) {},
  error(params) {},
};

for (let level of loggingLevels) {
  levels[level] = (params: { prefix?: string; message: any }): void => {
    const { prefix = level, message } = params;
    warnBestPractices({ prefix, message });
    logger[level](prefix, message);
  };
}

export { levels, warnFunctionFromLibrary, loggingLevels };
