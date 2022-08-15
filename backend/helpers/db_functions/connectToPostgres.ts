import knex from "knex";
import { constants } from "..";

const {
  postgresUser,
  postgresPassword,
  postgresDB,
  postgresHost,
  postgresPort,
} = constants;

let connectionToPostgres: any = null;

const connect = async () => {
  try {
    if (connectionToPostgres) {
      console.log("\n\nConnection to Postgres already exists.\n\n");
      return connectionToPostgres;
    }
    console.log("\n\nEstablishing connection to Postgres...");
    const connection = knex({
      client: "pg",
      connection: {
        host: postgresHost,
        port: postgresPort,
        user: postgresUser,
        password: postgresPassword,
        database: postgresDB,
      },
    });
    connectionToPostgres = connection;
    return connectionToPostgres;
  } catch (error) {
    console.log("\n\nError occured while connection to postgres : ", error);
    return connectionToPostgres;
  }
};

export default connect;
