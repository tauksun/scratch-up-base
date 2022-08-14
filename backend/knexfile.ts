// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import { constants } from "./helpers";

export default {
  development: {
    client: "postgresql",
    connection: {
      database: `${constants.postgresDB}:${constants.postgresPort}`,
      user: constants.postgresUser,
      password: constants.postgresPassword,
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
