import express, { Application } from "express";
// Load environment variables
import envLoader from "./loadEnvironmentVariables";
// Change the path to ".env" or your custom file
envLoader({ path: "./local.env.local" });

import router from "./router";
import { constants, log } from "./helpers";
import { serveStaticFiles, headersHandler, errorHandler } from "./middlewares";

// Initialize application
const app: Application = express();
const PORT = constants.PORT;

const expressServer = () => {
  // Modify HTTP Headers
  app.use(headersHandler());
  // Check for path & serve
  app.use(serveStaticFiles);
  // Routes
  app.use(router);
  // Catches unhandled or custom thrown errors
  app.use(errorHandler);

  app.listen(PORT, () =>
    log.info({
      prefix: "Application",
      message: {
        data: `Successfully started application#frontend on ${PORT}`,
      },
    })
  );
};

export default expressServer;
