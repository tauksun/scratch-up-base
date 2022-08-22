import express, { Application } from "express";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Custom Modules
import {
  constants,
  checkAndMigrate,
  checkAndSeed,
  connectToPostgres,
  connectToRedis,
} from "./helpers";
import { corsHandler, headersHandler } from "./middlewares";

// Routes/Apis
import {
  redisTest,
  testRoute,
  redisTestGETDATA,
  postgresTest,
  nginxTest,
  getPostgresData,
} from "./api";

//>>>>>>>>>> Delete this after fixing middlewares implementation >>>>>>>>>//
import cors from "cors";

// Initialize application
const app: Application = express();
const PORT = constants.PORT;

const expressServer = async () => {
  // Connect to DBs
  await connectToPostgres();
  await connectToRedis();

  // Check for Migrations, Seeding Database & execute accordingly
  await checkAndMigrate();
  await checkAndSeed();

  // Middlewares
  app.use(headersHandler);
  //------ TODO:------//
  app.use(cors());

  /////////////
  // Routes //
  ///////////

  // # Testing //
  app.use(nginxTest ); // Middleware for nginx testing
  app.get("/test", testRoute);
  app.get("/redis-test", redisTest);
  app.get("/redis-get-data", redisTestGETDATA);
  app.get("/postgres-test", postgresTest);
  app.get("/get-postgres-data",getPostgresData)

  // Start Application

  app.listen(PORT, () => {
    console.log(`Successfully started application#backend on ${PORT}`);
  });
};

export default expressServer;
