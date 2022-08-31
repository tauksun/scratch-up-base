import express, { Application } from "express";

// Load environment variables
import envLoader from "./loadEnvironmentVariables";
// Change the path to ".env" or your custom file
envLoader({ path: "./local.env.local" });

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
import router from "./routes";

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

  app.use(router);

  // Start Application

  app.listen(PORT, () => {
    console.log(`Successfully started application#backend on ${PORT}`);
  });
};

export default expressServer;
