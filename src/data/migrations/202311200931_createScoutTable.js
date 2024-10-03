const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.scout, (table) => {
      table.increments("ScoutID");
      table.string("LastName", 255).notNullable();
      table.string("FirstName", 255).notNullable();
      table.date("DateOfBirth").notNullable();
      table.string("Email", 255).notNullable();
      table.string("PhoneNumber", 255).notNullable();
      table.string("Adress", 255).notNullable();
      table.string("Tak", 255).notNullable();
      table.boolean("IsChief").notNullable();
      table.integer("GroupID").unsigned().notNullable();

      table.foreign("GroupID").references("GroupID").inTable("Groups");

      table.unique("ScoutID", "idx_scout_ID_unique");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.scout);
  },
};
