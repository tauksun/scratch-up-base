const environmentVariables = process.env;

// docker_build environment variable comes from Dockerfile
const buildindInDocker = environmentVariables.docker_build === "true";

// Database //
const getPostgresHost = () => {
  return (
    (buildindInDocker
      ? environmentVariables.POSTGRES_HOST_DOCK
      : environmentVariables.POSTGRES_HOST) || ""
  );
};
const postgresUser = environmentVariables.POSTGRES_USER || "";
const postgresPassword = environmentVariables.POSTGRES_PASSWORD || "";
const postgresDB = environmentVariables.POSTGRES_DB || "";
const postgresPort = parseInt(environmentVariables.POSTGRES_PORT || "5432");
const runMigrations = environmentVariables.runMigrations || false;
const seedDatabase = environmentVariables.seedDatabase || false;

// Redis //
const getRedisHost = () => {
  return (
    (buildindInDocker
      ? environmentVariables.REDIS_HOST_DOCK
      : environmentVariables.REDIS_HOST) || ""
  );
};
const redisPort = parseInt(environmentVariables.REDIS_PORT || "6379");
const redisUsername = environmentVariables.REDIS_USERNAME || "";
const redisPassword = environmentVariables.REDIS_PASSWORD || "";

const constants = {
  PORT: parseInt(environmentVariables.PORT || "") || 4200,
  buildindInDocker,
  allowedOrigins: JSON.parse(environmentVariables.CORS || "{}")?.allowedOrigins,
  postgresHost: getPostgresHost(),
  postgresUser,
  postgresPassword,
  postgresDB,
  postgresPort,
  runMigrations,
  seedDatabase,
  redisHost: getRedisHost(),
  redisPort,
  redisUsername,
  redisPassword,
};

export default constants;
