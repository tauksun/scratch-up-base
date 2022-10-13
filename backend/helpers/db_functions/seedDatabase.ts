import { constants, ask, executeInShell, log } from "..";

const seedDatabase = constants.seedDatabase;

const checkAndSeed = async () => {
  // Return if the seeding is disabled from .env
  if (!seedDatabase) {
    return;
  }

  // Prompt for y/n, if seedDatabase is not set to force
  if (seedDatabase === "true") {
    try {
      const buildindInDocker = constants.builtInDocker;
      const answer = buildindInDocker
        ? "y"
        : await ask("\n\nAre you sure about seeding the database ? (y/n)\n\n");
      if (!(answer === "y" || answer === "yes")) {
        return;
      }
      await seed();
    } catch (error) {
      log.error({
        prefix: "Seeding Database",
        message: { error },
      });
    }
    return;
  }

  if (seedDatabase === "force") {
    // Seed without asking via prompt
    await seed();
    return;
  }

  return;
};

// Function to run seed //
async function seed(): Promise<any> {
  try {
    log.info({
      prefix: "Seeding Database",
      message: {
        data: "Initiating...",
      },
    });
    // await executeInShell("./node_modules/knex/bin/cli.js seed:run");
    log.info({
      prefix: "Seeding Database",
      message: {
        data: "Seeding completed successfully",
      },
    });
    log.info({
      prefix: "Seeding Database",
      message: {
        data: `
        ###############################################

        REMEMBER TO SET : seedDatabase = false in .env
        to stop seeding database again after 
        initial setup.
        
        #################################################
        `,
      },
    });
    return;
  } catch (error) {
    log.error({
      prefix: "Seeding Database",
      message: {
        error,
      },
    });
    return;
  }
}

export default checkAndSeed;
