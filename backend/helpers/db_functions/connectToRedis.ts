import { createClient } from "redis";
import { constants } from "..";

const { redisUsername, redisPassword, redisHost, redisPort } = constants;

const getRedisURL = () => {
  if (redisUsername !== "local" && redisPassword !== "local") {
    return `redis://${redisUsername}:${redisPassword}@${redisHost}:${redisPort}`;
  }
  return `redis://${redisHost}:${redisPort}`;
};

const client = createClient({
  url: getRedisURL(),
});

let connectionToRedis: any = null;

const connect = async () => {
  try {
    if (connectionToRedis) {
      console.log("\n\nConnection to Redis already exists.");
      return connectionToRedis;
    }
    console.log("\n\nEstablishing connection to Redis ...");
    await client.connect();
    console.log("\n\nSuccessfully connected to Redis.");

    connectionToRedis = client;
    return connectionToRedis;
  } catch (error) {
    console.log("\n\nError occured while connecting to Redis : ", error);
    return connectionToRedis;
  }
};

export default connect;
