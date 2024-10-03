const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.event, (table) => {
      table.increments("EventID");
      table.string("EventName", 255).notNullable();
      table.date("StartDate").notNullable();
      table.date("EndDate").notNullable();
      table.string("Location", 255).notNullable();
      table.string("Adress", 255).notNullable();
      table.time("StartTime").notNullable();
      table.time("EndTime").notNullable();
      table.double("Price").notNullable();
      table.integer("MaximumParticipants").notNullable();

      table.unique("EventID", "idx_event_ID_unique");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.event);
  },
};
