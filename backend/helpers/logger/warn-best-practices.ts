import { warnFunctionFromLibrary, loggingLevels } from "./levels";
import { constants } from "../";

const warn_logging_best_practices = constants.warn_logging_best_practices;

// Check for best practices //
const warningBestPracticePrefix = "Logging Best Practices";
const warnBestPractices = (params: {
  prefix: string;
  message: string;
}): void => {
  if (!warn_logging_best_practices) {
    return;
  }
  const { prefix, message } = params;

  meaningfulPrefix(prefix);
  jsonTypeMessage(message);
};

const warn = (params: { prefix: string; warning: string }) => {
  const { prefix, warning } = params;
  warnFunctionFromLibrary(prefix, warning);
};

////////////////////
// Best Practices //
////////////////////

const meaningfulPrefix = (prefix: string) => {
  let isDefaultPrefix = false;
  for (let level of loggingLevels) {
    if (level === prefix) {
      isDefaultPrefix = true;
      break;
    }
  }
  if (isDefaultPrefix) {
    warn({
      prefix: warningBestPracticePrefix,
      warning: "Please use a meaningful prefix to provide more context",
    });
  }
};

const jsonTypeMessage = (message: string) => {
  if (message && typeof message !== "object") {
    warn({
      prefix: warningBestPracticePrefix,
      warning: "Please use json as log data for structured output",
    });
  }
};

export default warnBestPractices;
