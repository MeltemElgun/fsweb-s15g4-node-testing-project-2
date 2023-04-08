// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const sharedConfig = {
  client: "sqlite3",
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreing_keys=ON", done);
    },
  },
};
module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      filename: "./data/todo-app.db3",
    },
  },
  testing: {
    ...sharedConfig,
    connection: {
      filename: "./data/todo-app-testing.db3",
    },
  },
};
