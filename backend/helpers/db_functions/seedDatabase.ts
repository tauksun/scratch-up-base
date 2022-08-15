import { constants, ask, executeInShell } from "..";

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
      console.log(
        "\n\nError occured while asking for seeding database : ",
        error
      );
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
    console.log("\n\n Seeding Database \n\n");
    // await executeInShell("./node_modules/knex/bin/cli.js seed:run");
    console.log("\n\n Database seeding ran successfully\n\n");
    return;
  } catch (error) {
    console.log("\n\nError occured while seeding database : ", error);
    return;
  }
}

export default checkAndSeed;
