const environmentVariables = process.env;

const constants = {
  PORT: parseInt(environmentVariables.PORT) || 4200,
};

module.exports = constants;
