import { NextFunction, Request, Response } from "express";
import { existsSync } from "fs";
import path from "path";

const serveStaticFiles = (req: Request, res: Response, next: NextFunction) => {
  const url = req.url;

  let file: string = "";

  // Homepage
  if (url === "/") {
    file = "/index.html";
  }

  // Static files : .js, .css, images...
  if (url.split("/")[1] === "static") {
    file = url;
  }

  if (!file) {
    return next();
  }

  // Check if requested file exits
  const isExists = file ? isFileExists(file) : false;

  if (!isExists) {
    // Throw error with code 404 for not-found
    // This will be caught by errorHandler middleware
    console.log(`\n Error requested file doesn't exists ${file}`);
    throw { code: 404 };
  }

  res.sendFile(path.join(__dirname, `../../build${file}`));
};

const isFileExists = (file: string): Boolean => {
  try {
    const pathToStaticFile: string = path.join(
      __dirname,
      `../../build/${file}`
    );
    const isExists: Boolean = existsSync(pathToStaticFile);
    return isExists;
  } catch (error: any) {
    console.log("\n Error occured while checking for file : ", error);
    throw error;
  }
};

export default serveStaticFiles;
