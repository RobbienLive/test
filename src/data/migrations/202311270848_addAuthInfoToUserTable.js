const knex = require("knex");
const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.table(tables.scout, (table) => {
      table.string("Password_hash").notNullable();

      table.jsonb("Roles").notNullable();

    });
  },
  down: async (knex) => {
    await knex.schema.table(tables.scout, (table) => {
        table.dropColumn("Password_hash", "Roles");
    });
  },
};
