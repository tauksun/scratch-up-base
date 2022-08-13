const environmentVariables = process.env;

const constants = {
  PORT: parseInt(environmentVariables.PORT || "") || 4200,
  allowedOrigins: JSON.parse(environmentVariables.CORS || "{}")?.allowedOrigins
};

export default constants;
