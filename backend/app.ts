import express, { Application } from "express";

// Load environment variables
import envLoader from "./loadEnvironmentVariables";
// Change the path to ".env" or your custom file
envLoader({ path: "./local.env.local" });

// Custom Modules
import {
  constants,
  checkAndMigrate,
  connectToPostgres,
  connectToRedis,
  log,
} from "./helpers";
import { corsHandler, headersHandler, errorHandler } from "./middlewares";

// Routes/Apis
import router from "./routes";

// Initialize application
const app: Application = express();
const PORT = constants.PORT;

const expressServer = async () => {
  // Connect to DBs
  await connectToPostgres();
  await connectToRedis();

  // Check for Migrations execute accordingly
  await checkAndMigrate();

  // JSON Parser
  app.use(express.json());

  /////////////////
  // Middlewares //
  ////////////////

  // These middlewares get triggered for all routes //
  // To trigger a specific middleware for some routes or any specific route //
  // use that middleware in routes/index.ts //
  // eg : authentication middleware used for protected routes //

  // Modify HTTP Headers
  app.use(headersHandler());

  // CORS
  app.use(corsHandler());

  /////////////
  // Routes //
  ///////////

  app.use(router);

  ///////////////////
  // Handle errors //
  //////////////////
  app.use(errorHandler);

  // Start Application

  app.listen(PORT, () => {
    log.info({
      prefix: "Application",
      message: { data: `Successfully started application#backend on ${PORT}` },
    });
  });
};

export default expressServer;
