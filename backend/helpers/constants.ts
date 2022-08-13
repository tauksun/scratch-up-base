const environmentVariables = process.env;

const buildindInDocker = environmentVariables.docker_build === "true";
const runMigrations = environmentVariables.runMigrations || false;
const seedDatabase = environmentVariables.seedDatabase || false;

const constants = {
  PORT: parseInt(environmentVariables.PORT || "") || 4200,
  buildindInDocker,
  allowedOrigins: JSON.parse(environmentVariables.CORS || "{}")?.allowedOrigins,
  runMigrations,
  seedDatabase,
};

export default constants;
