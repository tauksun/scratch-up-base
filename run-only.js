const frontEnd = `
    build: ./frontend
    ports:
     - 3200:3200
    restart: always
`;
const backEnd = `
    build: ./backend
    ports:
     - 4200:4200
    depends_on:
     - database
     - redis
    restart: always
`;

const nginx = `

`;

const containerConfig = {
  frontEnd,
  backEnd,
};

//////// Check validity of passed params ////////
const fs = require("fs");

const makeFile = (params) => {
  console.log(process.argv.slice(2));

  let ymlData = ``;
  for (let container of params) {
    console.log({ container: containerConfig[container] });
    ymlData += `\n${container}:${containerConfig[container]}`;
  }

  console.log("Creating file");

  fs.writeFileSync("./abc.yml", ymlData);

  console.log("File created");
};

makeFile(["frontEnd", "backEnd"]);
