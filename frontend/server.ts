import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { constants } from "./helpers";
import axios from "axios";

const app = express();

// Middlewares here //

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Hit on middleware");
  console.log("reqURL > ", req.url);
  const url = req.url;
  let pathToFile;
  if (url.split("/")[1] === "static") {
    pathToFile = url;
    res.sendFile(path.join(__dirname, `../build${url}`));
    return;
  }
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("On Homepage Voila !!!");
});

app.get("/home-page-react", (req: Request, res: Response) => {
  res.sendFile(path.join(`${__dirname}`, "../build/index.html"));
});

app.listen(3200, () => console.log("Testing react on 3200 ..."));
