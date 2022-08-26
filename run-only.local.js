// Containers configuration
const version = `3.3`;
const volumes = `
  saand:
`;
const frontend = `
build: ./frontend
ports:
  - 3200:3200
restart: always
`;
const backend = `
build: ./backend
ports:
  - 4200:4200
depends_on:
  - database
  - redis
restart: always
`;

const database = `
image: postgres:14.5
ports:
  - 7654:5432
environment:
  - POSTGRES_PASSWORD=local_root
  - POSTGRES_DB=saand
volumes:
  - /saand/postgres:/var/lib/postgresql/data
restart: always
`;

const redis = `
image: redis:7.0.4
ports:
  - 7653:6379
volumes:
  - /saand/redis:/data
restart: always
`;
const proxy = `
image: nginx:1.23.1
ports:
  - 80:80
volumes:
  - ./nginx:/etc/nginx/conf.d
depends_on:
  - frontend
  - backend
restart: always
`;

const containerConfig = {
  version,
  volumes,
  frontend,
  backend,
  database,
  redis,
  proxy,
};

const validContainers = ["backend", "frontend", "proxy", "redis", "database"];

async function synchronousCommandExecution(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
      }
      resolve(stdout);
    });
  });
}

function streamedCommandExecution(command) {
  const process = spawn("bash", ["-c", command]);
  process.stdout.on("data", (data) => console.log("\n", data.toString()));
  process.stderr.on("data", (error) =>
    console.log("\nError : ", error.toString())
  );
  process.on("close", () => console.log("\nStopped."));
  process.on("error", (err) => console.log("\nError : ", err));
}

async function getAllRunningContainerNames() {
  try {
    const command = 'sudo docker ps --format "{{.Names}}"';
    const result = await synchronousCommandExecution(command);
    const containersArray = result ? result.split(" ") : [];
    const containers = result ? result.split("\n") : [];
    return containers;
  } catch (error) {
    console.log("\nError occured while getting running containers : ", error);
    throw error;
  }
}

async function getAllContainerNames() {
  try {
    const command = 'sudo docker ps -a --format "{{.Names}}"';
    const result = await synchronousCommandExecution(command);
    const containers = result ? result.split("\n") : [];
    return containers;
  } catch (error) {
    console.log("\nError occured while getting running containers : ", error);
    throw error;
  }
}

async function removeRunningContainers() {
  try {
    const containersToCheckFor = [
      "saand_frontend_1",
      "saand_backend_1",
      "saand_proxy_1",
      "saand_database_1",
      "saand_redis_1",
    ];

    const runningContainers = await getAllRunningContainerNames();

    if (runningContainers.length) {
      let containersToStop = ``;
      for (let container of containersToCheckFor) {
        if (runningContainers.includes(container)) {
          containersToStop += `${container} `;
        }
      }

      if (containersToStop) {
        const stopCommand = `sudo docker stop ${containersToStop}`;
        const stopResult = await synchronousCommandExecution(stopCommand);
        console.log("\n Stopped containers result : ", stopResult);
      }
    }

    const allContainers = await getAllContainerNames();

    if (allContainers.length) {
      let containersToRemove = ``;
      for (let container of containersToCheckFor) {
        if (allContainers.includes(container)) {
          containersToRemove += `${container} `;
        }
      }

      if (containersToRemove) {
        const removeCommand = `sudo docker rm ${containersToRemove}`;
        const removeResult = await synchronousCommandExecution(removeCommand);
        console.log("\n Removed containers result : ", removeResult);
      }
    }
  } catch (error) {
    console.log(
      "\nError occured while removing already running saand containers : ",
      error
    );
    throw error;
  }
}

function getPassedArguments() {
  const arguments = process.argv;
  const scriptArguments = [...arguments];
  const passedArguments =
    scriptArguments && scriptArguments.length > 2
      ? scriptArguments.splice(2)
      : [];
  return passedArguments;
}

function validatePassedContainers(containerNames) {
  if (!containerNames.length) {
    throw "No container passed";
  }
  for (container of containerNames) {
    if (!validContainers.includes(container)) {
      throw `
      Not a valid container name :- "${container}"
      Valid containers :- ${validContainers}      
      `;
    }
  }
}

function help() {
  const passedArguments = getPassedArguments();
  if (!(passedArguments[0] === "help")) {
    return;
  }
  const validCommands = `
  Run this file to run specific containers 
  syntax : node run-only.local.js <containername> <containername2>

  eg:- 
  node run-only.local.js database 
  node run-only.local.js proxy 
  node run-only.local.js frontend backend 
  `;
  console.log(validCommands);
  return 1;
}

function makeDockerComposeFile() {}

//////// Check validity of passed params ////////
//////// Compose down first /////////
const fs = require("fs");
const { exec, spawn } = require("child_process");
const executeInShell = (command) => {
  return new Promise((resolve, reject) => {
    // exec(command, (error, stdout, stderr) => {
    //   if (error || stderr) {
    //     reject(error || stderr);
    //   }
    //   resolve(stdout);
    // });
    const dockFile = __dirname + "/abc.yml";

    const process = spawn("bash", [
      "-c",
      `sudo docker-compose -f ${dockFile} up`,
    ]);
    process.stdout.on("data", (data) =>
      console.log("\n\nData : ", data.toString())
    );
    process.stderr.on("data", (data) =>
      console.log("\n\nError : ", data.toString())
    );
    process.on("close", () => console.log("\nClosed"));
    process.on("error", (err) => console.log("\nErrr > ", err));
  });
};

const makeFile = async (params) => {
  console.log(process.argv.slice(2));

  let ymlData = ``;
  for (let container of params) {
    console.log({ container: containerConfig[container] });
    ymlData += `\n${container}:${containerConfig[container]}`;
  }

  console.log("Creating file");

  fs.writeFileSync("./abc.yml", ymlData);

  console.log("File created");

  const runCommand = "ls" || "sudo docker-compose -f abc.yml up";

  try {
    console.log("Running ... command ...");
    await executeInShell(runCommand);
    console.log("Voila !!!");
  } catch (error) {
    console.log("Error > ", error);
  }
};

async function run() {
  try {
    // Check for help
    const didHelp = help();
    if (didHelp) {
      return;
    }

    // Validate passed container as arguments
    const containerNames = getPassedArguments();
    validatePassedContainers(containerNames);

    // Stop already running containers
    await removeRunningContainers();

    // ---------------------- Logic to run working combination of containers ------------------ //
    //
    //
    // ----------------------------------------------------------------------------------------//
  } catch (error) {
    console.log("\nError occured while running containers : ", error);
  }
}

run();
