import express, { Application } from "express";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Custom Modules
import { constants, checkAndMigrate, checkAndSeed } from "./helpers";
import { corsHandler, headersHandler } from "./middlewares";

// Routes/Apis
import { testRoute } from "./api";

//>>>>>>>>>> Delete this after fixing middlewares implementation >>>>>>>>>//
import cors from "cors";

// Initialize application
const app: Application = express();
const PORT = constants.PORT;

const expressServer = async () => {
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
  app.get("/test", testRoute);

  // Start Application

  app.listen(PORT, () => {
    console.log(`Successfully started application#backend on ${PORT}`);
  });
};

export default expressServer;