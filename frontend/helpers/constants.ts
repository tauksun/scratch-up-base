const environmentVariables = process.env;

const webFiles = ["manifest.json", "favicon.ico", "logo.png","robots.txt"];

const constants = {
  PORT: parseInt(environmentVariables.PORT || "3200"),
  backendURL: environmentVariables.backendURL || "",
  webFiles,
};

export default constants;
