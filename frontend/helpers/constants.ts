const environmentVariables = process.env;

const webFiles = ["manifest.json", "favicon.ico", "logo.png", "robots.txt"];

// logger //
// this sets the default to false
const logger = environmentVariables.logger === "true" ? true : false;
// this sets the default to true
const warn_logging_best_practices =
  environmentVariables.warn_logging_best_practices === "false" ? false : true;

const constants = {
  PORT: parseInt(environmentVariables.PORT || "3200"),
  backendURL: environmentVariables.backendURL || "",
  webFiles,
  logger,
  warn_logging_best_practices,
};

export default constants;
