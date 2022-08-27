/**
 * Running containers from this file creates a new process &
 * uses that to run containers.
 *
 * It is safe to ctrl+c, if you don't want to see logs, containers won't stop
 */

// Containers configuration
const version = "3.3";
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
const jsFileName = "run-only.local.js";
// logger
// set to false > to not log container logs when run from this file
const logger = (...params) => {
  const log = true;
  if (log) {
    return console.log(...params);
  }
  return;
};

async function synchronousCommandExecution(command) {
  const { exec } = require("child_process");
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
  const { spawn } = require("child_process");
  const process = spawn("bash", ["-c", command]);
  process.stdout.on("data", (data) => logger("\n", data.toString()));
  process.stderr.on("data", (error) => logger("\n", error.toString()));
  process.on("close", () => logger("\nStopped."));
  process.on("error", (err) => logger("\nError : ", err.toString()));
}

async function getAllRunningContainerNames() {
  try {
    const command = 'sudo docker ps --format "{{.Names}}"';
    const result = await synchronousCommandExecution(command);
    const containers = result ? result.split("\n") : [];
    return containers;
  } catch (error) {
    logger("\nError occured while getting running containers : ", error);
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
    logger("\nError occured while getting running containers : ", error);
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
        logger("\n Stopped containers result : \n", stopResult);
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
        logger("\n Removed containers result : \n", removeResult);
      }
    }
  } catch (error) {
    logger(
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

function help(data) {
  const passedArguments = getPassedArguments();
  if (!(passedArguments[0] === "help")) {
    return;
  }
  const fileName = data.fileName;
  if (!fileName) {
    throw "Internal error : No filename passed to help function";
  }
  const validCommands = `
  Use this file to run specific containers 

  syntax :- node ${fileName} <containername> <containername2>

  eg:- 
  node ${fileName} database 
  node ${fileName} proxy 
  node ${fileName} frontend backend 

  To run all containers :- sudo docker-compose up  

  Stop containers with : 
    - node ${fileName} stop
    - sudo docker-compose down

  * Running containers from this file creates a new process & uses that to run containers.  
  * It is safe to ctrl+c, if you don't want to see logs, containers won't stop.  
  
  `;
  logger(validCommands);
  return 1;
}

function makeContainerToRun(containerNames) {
  const containersToRun = new Set();

  for (let container of containerNames) {
    if (container === "frontend") {
      containersToRun.add("frontend");
      containersToRun.add("proxy");
    }
    if (container === "backend") {
      containersToRun.add("backend");
      containersToRun.add("proxy");
      containersToRun.add("database");
      containersToRun.add("redis");
    }
    if (container === "proxy") {
      containersToRun.add("proxy");
      containersToRun.add("database");
      containersToRun.add("redis");
      containersToRun.add("backend");
      containersToRun.add("frontend");
    }
    containersToRun.add(container);
  }

  return containersToRun;
}

function makeYmlFile(fileData) {
  const fileName = fileData.fileName;
  const containers = fileData.containers;

  // This can also handle if both arguments are not passed \("^")/
  // one by one
  if (!(fileName && containers)) {
    throw `Could not find ${
      fileName ? "containers to run" : "fileName for yml"
    } in passed arguments.`;
  }

  const fs = require("fs");
  let containerData = ``;
  for (let container of containers) {
    containerData += `\n  ${container}:${containerConfig[container]}`;
  }
  const ymlData = `
version: "${version}"
volumes:${volumes}
services:${containerData}
  `;
  fs.writeFileSync(fileName, ymlData);
  logger(`\n ${fileName} file created`);
  return;
}

function runContainers(ymlFile) {
  const runContainersCommand = `sudo docker-compose -f ./${ymlFile} up`;
  streamedCommandExecution(runContainersCommand);
  return;
}

async function stop() {
  try {
    const passedArguments = getPassedArguments();
    if (!(passedArguments[0] === "stop")) {
      return;
    }
    await removeRunningContainers();
    return 1;
  } catch (error) {
    logger("\n Error occured while stopping containers : ", error);
    logger(
      "\nTry to stop containers by manually running : sudo docker-compose down"
    );
    return 1;
  }
}

async function run() {
  try {
    // Check for help
    const helpData = {
      fileName: jsFileName,
    };
    const didHelp = help(helpData);
    if (didHelp) {
      return;
    }

    // Check for stop
    const didStop = await stop();
    if (didStop) {
      return;
    }

    // Validate passed container as arguments
    const containerNames = getPassedArguments();
    validatePassedContainers(containerNames);

    // Stop already running containers
    await removeRunningContainers();

    // Logic to run working combination of containers //
    const containersToRun = makeContainerToRun(containerNames);

    // Make run-only.local.yml file

    const fileName = "run-only.local.yml";
    const fileData = {
      fileName,
      containers: containersToRun,
    };
    makeYmlFile(fileData);

    // Run containers
    runContainers(fileName);
  } catch (error) {
    logger("\nError occured while running containers : ", error);
    logger(`\n For checking help run : node ${jsFileName} help`);
  }
}

run();
