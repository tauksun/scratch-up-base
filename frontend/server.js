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

const testRoute = async (req, res) => {
  const axios = require("axios");
  console.log("\n\n ### Hit on -- frontend test route -- ### \n\n");
  const resposne = await axios.get(`${constants.backendURL}/test`);
  console.log("Got response from backend server > ", resposne);
  res.json({ data: { serverResponse: resposne } });
};

app.get("/", (req, res) => {
  res.send("On HOmepage");
});

app.get("/test", testRoute);

// Start Application
const PORT = constants.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error occured while starting application#frontend : ", err);
    return;
  }
  console.log(`Successfully started application#frontend on ${PORT}`);
});
