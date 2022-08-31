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
 * Pass stage name same as **.env.stageName** or use path to load from a different location
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

    const basePath = path.join(__dirname, "../../");

    const pathToStage = stage
      ? path.join(basePath, `./.env.${stage}`)
      : path.join(basePath, `./.env`);

    let pathToEnv = pathToCustomEnv || pathToStage;

    // Check if file exists //
    const isFileExists = fs.existsSync(pathToEnv);
    if (!isFileExists) {
      throw `Could not find config file at ${pathToEnv}`;
    }

    ////////////////////////////////////////////////
    console.log(
      `\n\n###############\n\n ${{
        stage,
        pathToCustomEnv,
        basePath,
        pathToStage,
        pathToEnv,
        isFileExists,
      }}`
    );
    dotenv.config({ path: pathToEnv });
    return;
  } catch (error) {
    console.log(
      "\n Error occured while loading environment variables : ",
      error
    );
    throw error;
  }
}

export default envLoader;
