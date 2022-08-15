import { constants, ask, executeInShell } from "..";

const runMigrations = constants.runMigrations;

const checkAndMigrate = async () => {
  // Return if the runMigrations are disabled from .env
  if (!runMigrations) {
    return;
  }

  // Prompt for y/n, if runMigrations are not set to force
  // #IMPORTANT : Don't prompt when running in docker
  if (runMigrations === "true") {
    try {
      const buildindInDocker = constants.buildindInDocker;
      const answer = buildindInDocker
        ? "y"
        : await ask("\n\nAre you sure about running migrations ? (y/n)\n\n");
      if (!(answer === "y" || answer === "yes")) {
        return;
      }
      await migrate();
    } catch (error) {
      console.log("\n\nError occured while asking for migrations : ", error);
    }
    return;
  }

  if (runMigrations === "force") {
    // Migrate without asking via prompt
    await migrate();
    return;
  }

  return;
};

// Function to run migrations //
async function migrate(): Promise<any> {
  try {
    console.log("\n\n Running migrations \n\n");
    await executeInShell("./node_modules/knex/bin/cli.js migrate:up");
    console.log("\n\n Migrations ran successfully\n\n");
    return;
  } catch (error) {
    console.log("\n\nError occured while running migrations : ", error);
    return;
  }
}

export default checkAndMigrate;
