import { createClient, RedisClientType } from "redis";
import { constants, log } from "..";

const { redisUsername, redisPassword, redisHost, redisPort } = constants;

const getRedisURL = () => {
  // TODO : check this based on environment
  if (redisUsername !== "local" && redisPassword !== "local") {
    return `redis://${redisUsername}:${redisPassword}@${redisHost}:${redisPort}`;
  }
  return `redis://${redisHost}:${redisPort}`;
};

let connectionToRedis: RedisClientType;

const connect = async () => {
  try {
    if (connectionToRedis) {
      log.info({
        prefix: "Redis",
        message: {
          data: "Connection to Redis already exists.",
        },
      });
      return connectionToRedis;
    }
    log.info({
      prefix: "Redis",
      message: {
        data: "Establishing connection to Redis",
      },
    });
    connectionToRedis = createClient({
      url: getRedisURL(),
    });

    await connectionToRedis.connect();
    log.info({
      prefix: "Redis",
      message: {
        data: "Successfully connected to Redis",
      },
    });

    return connectionToRedis;
  } catch (error) {
    log.error({
      prefix: "Connecting To Redis",
      message: {
        error,
      },
    });
    return connectionToRedis;
  }
};

export default connect;
