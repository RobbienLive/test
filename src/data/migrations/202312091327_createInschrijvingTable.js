const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.inschrijving, (table) => {
        table.increments('InschrijvingID');
        table.integer('EventID').unsigned().notNullable();
        table.integer('ScoutID').unsigned().notNullable();

        table.foreign('EventID').references('EventID').inTable('Events');
        table.foreign('ScoutID').references('ScoutID').inTable('Scouts');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.inschrijving);
  },
};