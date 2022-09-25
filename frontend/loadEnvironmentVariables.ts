import dotenv from "dotenv";
import path from "path";
import fs from "fs";
/**
 *
 * @description
 * By default looks for .env at base dir & loads it
 *
 * To load different custom .env files for different environment
 * eg : .env.local, .env.development, .env.staging... \
 * Pass stage name same as **stage** or use path to load from a different location
 *
 * _**If path is set, it takes precedence over stage**_
 * @example
 * // Load default .env
 * envLoader()
 *
 * // Load for staging
 * // This loads variables from .env.staging at the base directory
 * envLoader({
 * stage:"staging"
 * })
 *
 * // Load from other file location
 * envLoader({
 * path:"<file path here>"
 * })
 *
 */
function envLoader(params?: { stage?: string; path?: string }) {
  try {
    const stage = params?.stage;
    const pathToCustomEnv = params?.path;

    const basePath = __dirname;

    const pathToStage = stage
      ? path.join(basePath, `./.env.${stage}`)
      : path.join(basePath, `./.env`);

    let pathToEnv = pathToCustomEnv || pathToStage;

    // Check if file exists //
    const isFileExists = fs.existsSync(pathToEnv);
    if (!isFileExists) {
      throw `Could not find config file at ${pathToEnv}`;
    }

    // Show user to change path or use .env instead of local.env.local //
    if (pathToEnv === "./local.env.local") {
      console.info(
        "\x1b[43m%s\x1b[0m",
        `
      ----------------------------------
                IMPORTANT
      ----------------------------------

      Change path to envLoader function in app.ts from "./local.env.local" to "./.env" 
      or to your custom .env file.

      This is set by default so as to run app & share the configuration.

      You can create your own .env from scratch or 
      to start : 
      
      1) create a .env file
      2) copy local.env.local content to .env
      3) Remove the object parameter passed to envLoader in app.ts such as : envLoader()

          This will load variables from .env file.
      
      You can also create custom .env files for different staging environments, 
      to start look at the definition of envLoader.

      ----------------------------------
                IMPORTANT      
      ----------------------------------
      `
      );
    }

    dotenv.config({ path: pathToEnv });
    return;
  } catch (error) {
    console.error(
      "\x1b[41m%s\x1b[0m",
      ` Error occured while loading Environment Variables : ${error}`
    );
    throw error;
  }
}

export default envLoader;
