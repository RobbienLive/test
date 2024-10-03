const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    // first delete all entries 
    

    // then add the fresh groups
    await knex(tables.inschrijving).insert([
      {
        InschrijvingID: 1,
        EventID: 1,
        ScoutID: 1,
      },
      {
        InschrijvingID: 2,
        EventID: 1,
        ScoutID: 2,
      },
      {
        InschrijvingID: 3,
        EventID: 1,
        ScoutID: 3,
      },
      {
        InschrijvingID: 4,
        EventID: 2,
        ScoutID: 1,
      },
      {
        InschrijvingID: 5,
        EventID: 2,
        ScoutID: 2,
      },


    ]);
  },
};
