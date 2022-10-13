import { constants, ask, executeInShell, log } from "..";

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
      const buildindInDocker = constants.builtInDocker;
      const answer = buildindInDocker
        ? "y"
        : await ask("\n\nAre you sure about running migrations ? (y/n)\n\n");
      if (!(answer === "y" || answer === "yes")) {
        return;
      }
      await migrate();
    } catch (error) {
      log.error({
        prefix: "Migrations",
        message: { error },
      });
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
    log.info({
      prefix: "Migrations",
      message: {
        data: "Running migrations...",
      },
    });
    await executeInShell("./node_modules/knex/bin/cli.js migrate:up");
    log.info({
      prefix: "Migrations",
      message: {
        data: "Migrations ran successfully",
      },
    });
    return;
  } catch (error) {
    log.error({
      prefix: "Migrations : Running",
      message: { error },
    });
    return;
  }
}

export default checkAndMigrate;
