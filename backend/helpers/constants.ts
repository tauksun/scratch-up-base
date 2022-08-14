const environmentVariables = process.env;

// docker_build environment variable comes from Dockerfile
const buildindInDocker = environmentVariables.docker_build === "true";

// Database //
const getDatabaseHost = () => {
  return (
    (buildindInDocker
      ? environmentVariables.DATABASE_HOST_DOCK
      : environmentVariables.DATABASE_HOST) || ""
  );
};
const postgresUser = environmentVariables.POSTGRES_USER || "";
const postgresPassword = environmentVariables.POSTGRES_PASSWORD || "";
const postgresDB = environmentVariables.POSTGRES_DB || "";
const postgresPort = environmentVariables.POSTGRES_PORT || "";
const runMigrations = environmentVariables.runMigrations || false;
const seedDatabase = environmentVariables.seedDatabase || false;

const constants = {
  PORT: parseInt(environmentVariables.PORT || "") || 4200,
  buildindInDocker,
  allowedOrigins: JSON.parse(environmentVariables.CORS || "{}")?.allowedOrigins,
  databaseHost: getDatabaseHost(),
  postgresUser,
  postgresPassword,
  postgresDB,
  postgresPort,
  runMigrations,
  seedDatabase,
};

export default constants;
