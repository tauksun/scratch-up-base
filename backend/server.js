const express = require("express");
const cors = require("cors");

// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Initialize application
const app = express();

// Middlewares
//! Correct cors use //
app.use(cors());

// Custom Modules
const { constants } = require("./helpers");

/////////////
// Routes //
///////////

const testRoute = (req, res) => {
  console.log("\n\n### Hit on test route ### \n\n");
  res.json({ data: "From test route" });
};

app.get("/test", testRoute);

// Start Application
const PORT = constants.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error occured while starting application#backend : ", err);
    return;
  }
  console.log(`Successfully started application#backend on ${PORT}`);
});
