import knex, { Knex } from "knex";
import { constants, log } from "..";

const {
  postgresUser,
  postgresPassword,
  postgresDB,
  postgresHost,
  postgresPort,
} = constants;

let connectionToPostgres: Knex;

const connect = async () => {
  try {
    if (connectionToPostgres) {
      log.info({
        prefix: "Postgres",
        message: {
          data: "Connection to Postgres already exists",
        },
      });
      return connectionToPostgres;
    }
    log.info({
      prefix: "Postgres",
      message: {
        data: "Establishing connection to Postgres",
      },
    });
    connectionToPostgres = knex({
      client: "pg",
      connection: {
        host: postgresHost,
        port: postgresPort,
        user: postgresUser,
        password: postgresPassword,
        database: postgresDB,
      },
    });
    return connectionToPostgres;
  } catch (error) {
    log.error({
      prefix: "Connecting to Postgres",
      message: { error },
    });
    return connectionToPostgres;
  }
};

export default connect;
