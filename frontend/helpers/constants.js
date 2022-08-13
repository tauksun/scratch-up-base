const environmentVariables = process.env;

const constants = {
  PORT: parseInt(environmentVariables.PORT) || 3200,
  backendURL: environmentVariables.backendURL || ""
};

module.exports = constants;
