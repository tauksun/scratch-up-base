import express, { Application } from "express";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Initialize application
const app: Application = express();

// Middlewares
import { corsHandler, headersHandler } from "./middlewares";

// HttpHeaders
app.use(headersHandler);

// Cors

//------ TODO:------//
import cors from "cors";
app.use(cors());

// Custom Modules
import { constants } from "./helpers";

/////////////
// Routes //
///////////

// # Testing //
import { testRoute } from "./api";
app.get("/test", testRoute);

// Start Application
const PORT = constants.PORT;

app.listen(PORT, () => {
  console.log(`Successfully started application#backend on ${PORT}`);
});
