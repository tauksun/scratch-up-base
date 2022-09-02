/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import { constants } from "./helpers";

const {
  postgresHost,
  postgresDB,
  postgresUser,
  postgresPassword,
  postgresPort,
} = constants;

export default {
  development: {
    client: "postgresql",
    connection: {
      host: postgresHost,
      database: postgresDB,
      user: postgresUser,
      password: postgresPassword,
      port: postgresPort,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
