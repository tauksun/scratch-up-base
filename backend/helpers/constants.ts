const environmentVariables = process.env;

// docker_build environment variable comes from Dockerfile
const builtInDocker = environmentVariables.docker_build === "true";

// Database //
const getPostgresHost = () => {
  return (
    (builtInDocker
      ? environmentVariables.POSTGRES_HOST_DOCK
      : environmentVariables.POSTGRES_HOST) || ""
  );
};

const getPostgresPort = () => {
  return parseInt(
    (builtInDocker
      ? environmentVariables.POSTGRES_PORT_DOCK
      : environmentVariables.POSTGRES_PORT) || ""
  );
};

const postgresUser = environmentVariables.POSTGRES_USER || "";
const postgresPassword = environmentVariables.POSTGRES_PASSWORD || "";
const postgresDB = environmentVariables.POSTGRES_DB || "";
const runMigrations = environmentVariables.runMigrations || false;
const seedDatabase = environmentVariables.seedDatabase || false;

// Redis //
const getRedisHost = () => {
  return (
    (builtInDocker
      ? environmentVariables.REDIS_HOST_DOCK
      : environmentVariables.REDIS_HOST) || ""
  );
};

const getRedisPort = () => {
  return parseInt(
    (builtInDocker
      ? environmentVariables.REDIS_PORT_DOCK
      : environmentVariables.REDIS_PORT) || ""
  );
};
const redisUsername = environmentVariables.REDIS_USERNAME || "";
const redisPassword = environmentVariables.REDIS_PASSWORD || "";

// Tables //
const users = "users";
const user_details = "user_details";

// Hash //
const saltRounds = parseInt(environmentVariables.saltRounds || "10"); // Default to 10

// JSON Web Token //
const jwtSecretKey =
  environmentVariables.jwtSecretKey ||
  "not to be used default private key # only for local development";
const jwtDefaultExpiresIn = 86400;

// Default user token name //
const userTokenName = environmentVariables.userTokenName || "sess";
const redisSessionHashKey =
  environmentVariables.redisSessionHashKey || "session";
const redisSessionExpiryInSeconds = parseInt(
  environmentVariables.redisSessionExpiryInSeconds || "86400"
);
const redisCacheHashKey = environmentVariables.redisCacheHashKey || "cache";

const constants = {
  PORT: parseInt(environmentVariables.PORT || "") || 4200,
  builtInDocker,
  allowedOrigins:
    JSON.parse(environmentVariables.CORS || "{}")?.allowedOrigins || [],
  postgresHost: getPostgresHost(),
  postgresUser,
  postgresPassword,
  postgresDB,
  postgresPort: getPostgresPort(),
  runMigrations,
  seedDatabase,
  redisHost: getRedisHost(),
  redisPort: getRedisPort(),
  redisUsername,
  redisPassword,
  tables: {
    users,
    user_details,
  },
  hash: {
    saltRounds,
  },
  jwt: {
    secretKey: jwtSecretKey,
    defaultExpiresIn: jwtDefaultExpiresIn,
  },
  userTokenName,
  session: {
    redisHashKey: redisSessionHashKey,
    expiryInSeconds: redisSessionExpiryInSeconds,
  },
  cache: {
    redisHashKey: redisCacheHashKey,
  },
};

export default constants;
