const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.group, (table) => {
        table.increments("GroupID");
        table.string("GroupName", 255).notNullable();
        table.string("Adress", 255).notNullable();
      table.unique("GroupID", "idx_group_ID_unique");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.group);
  },
};
